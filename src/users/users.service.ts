import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcryptjs'
import { FunctionService } from 'src/utils/functions.service'
import { Op, QueryTypes, Transaction } from 'sequelize'
import { CountriesService } from 'src/address/countries/countries.service'
import { FirebaseUid } from 'src/firebase-uids/firebase-uid.model'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'
import { FileGalleries } from 'src/file-galleries/file-galleries.model'
import { File } from 'src/files/file.model'
import { Sequelize } from 'sequelize-typescript'
import { Seller } from 'src/sellers/seller.model'
import { Address } from 'src/address/address.model'
import { City } from 'src/address/cities/city.model'
import { Country } from 'src/address/countries/country.model'
import { AddressService } from 'src/address/address.service'
import { MailsService } from 'src/auth/mails.service'

import { FirebaseUidsService } from '../firebase-uids/firebase-uids.service'

import { UpdatePasswordDto } from './dto/update-password.dto'
import { DeleteUserDto } from './dto/delete-user'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.model'

@Injectable()
export class UsersService {
  constructor(
    private sequelize: Sequelize,
    private addressService: AddressService,
    private firebaseUidsService: FirebaseUidsService,
    private countriesSerevice: CountriesService,
    private mailsService: MailsService,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createUser(dto: CreateUserDto, transaction?: Transaction) {
    const options = transaction ? { transaction } : undefined
    return await this.userRepository.create(dto, options)
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: { iduser: id },
    })

    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    if (dto.email && dto.email !== userToUpdate.email) {
      const userEmail = await this.getUserByEmail(dto.email)
      if (userEmail) {
        throw new BadRequestException(Messages.EMAIL_ALREADY_IN_USE[language.code])
      }
    }

    if (dto.phone_number && dto.phone_number !== userToUpdate.phone_number) {
      const userPhoneNumber = await this.getUserByPhoneNumber(dto.phone_number)
      if (userPhoneNumber) {
        throw new BadRequestException(Messages.PHONE_NUMBER_ALREADY_IN_USE[language.code])
      }
    }

    if (dto.country) {
      const country = await this.countriesSerevice.findByName(dto.country)

      if (!country) {
        throw new BadRequestException(Messages.COUNTRY_NOT_FOUND[language.code])
      }
      userToUpdate.idcountry = country.idcountry
    }

    userToUpdate.email = dto.email || userToUpdate.email
    userToUpdate.name = dto.name || userToUpdate.name
    userToUpdate.surname = dto.surname || userToUpdate.surname
    userToUpdate.phone_number = dto.phone_number || userToUpdate.phone_number
    userToUpdate.document_type = dto.document_type || userToUpdate.document_type
    userToUpdate.document_number = dto.document_number || userToUpdate.document_number
    userToUpdate.user_type = dto.user_type || userToUpdate.user_type
    userToUpdate.file_profile_picture = dto.file_profile_picture || userToUpdate.file_profile_picture
    userToUpdate.birthdate = dto.birthdate ? new Date(dto.birthdate) : userToUpdate.birthdate
    userToUpdate.sex = dto.sex || userToUpdate.sex
    userToUpdate.token_fcm = dto.token_fcm || userToUpdate.token_fcm
    userToUpdate.idaddress = dto.idaddress || userToUpdate.idaddress

    await userToUpdate.save()

    return userToUpdate
  }

  async updateUserFromAdmin(id: number, dto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: { iduser: id },
    })

    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    if (dto.email && dto.email !== userToUpdate.email) {
      const userEmail = await this.getUserByEmail(dto.email)
      if (userEmail) {
        throw new BadRequestException(Messages.EMAIL_ALREADY_IN_USE[language.code])
      }
    }

    if (dto.phone_number && dto.phone_number !== userToUpdate.phone_number) {
      const userPhoneNumber = await this.getUserByPhoneNumber(dto.phone_number)
      if (userPhoneNumber) {
        throw new BadRequestException(Messages.PHONE_NUMBER_ALREADY_IN_USE[language.code])
      }
    }

    if (dto.country) {
      const country = await this.countriesSerevice.findByName(dto.country)

      if (!country) {
        throw new BadRequestException(Messages.COUNTRY_NOT_FOUND[language.code])
      }
      userToUpdate.idcountry = country.idcountry
    }

    userToUpdate.email = dto.email || userToUpdate.email
    userToUpdate.name = dto.name || userToUpdate.name
    userToUpdate.surname = dto.surname || userToUpdate.surname
    userToUpdate.phone_number = dto.phone_number || userToUpdate.phone_number
    userToUpdate.document_type = dto.document_type || userToUpdate.document_type
    userToUpdate.document_number = dto.document_number || userToUpdate.document_number
    userToUpdate.user_type = dto.user_type || userToUpdate.user_type
    userToUpdate.file_profile_picture = dto.file_profile_picture
    userToUpdate.birthdate = dto.birthdate ? new Date(dto.birthdate) : userToUpdate.birthdate
    userToUpdate.sex = dto.sex || userToUpdate.sex
    userToUpdate.token_fcm = dto.token_fcm || userToUpdate.token_fcm
    userToUpdate.idaddress = dto.idaddress || userToUpdate.idaddress

    await userToUpdate.save()

    return await this.getUserResume(userToUpdate.iduser)
  }

  async updateUserType(id: number, userType: number) {
    const userToUpdate = await this.userRepository.findOne({
      where: { iduser: id },
    })
    userToUpdate.user_type = userType
    await userToUpdate.save()
    return userToUpdate
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: { iduser: id },
    })
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    const hashPassword = await bcrypt.hash(dto.password, 10)
    userToUpdate.password = hashPassword
    await userToUpdate.save()
    return userToUpdate
  }

  async updateTokenFcm(id: number, tokenFcm: string) {
    const userToUpdate = await this.userRepository.findByPk(id)
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    await this.updateDuplicTokenFcm(tokenFcm)
    await this.userRepository.update({ token_fcm: tokenFcm }, { where: { iduser: id } })
    return await this.userRepository.findByPk(id)
  }

  async updateLang(id: number, lang: string) {
    const userToUpdate = await this.userRepository.findOne({
      where: { iduser: id },
    })
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    userToUpdate.lang = lang
    await userToUpdate.save()
    return userToUpdate
  }

  async updateActive(id: number, active: boolean) {
    const userToUpdate = await this.userRepository.findOne({
      where: { iduser: id },
    })
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    userToUpdate.active = active
    await userToUpdate.save()
    if (!active) {
      await this.sequelize.query(
        `
     UPDATE publications 
      SET active = false 
      WHERE iduser = ${id} 
        AND order_made IS NOT TRUE;
      `,
        { type: QueryTypes.SELECT },
      )
    }
    if (active) {
      this.mailsService.sendEmailBuyer(id)
    }

    return await this.getUserResume(userToUpdate.iduser)
  }

  async deleteUser(dto: DeleteUserDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: { iduser: dto.iduser },
    })
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }

    await this.sequelize.query(
      `
      UPDATE publications 
      SET active = false 
      WHERE iduser =${dto.iduser} 
        AND order_made IS NOT TRUE;
    `,
      { type: QueryTypes.SELECT },
    )
    userToUpdate.active = false
    userToUpdate.email = 'delete@delete.com'
    userToUpdate.phone_number = '000000000'
    userToUpdate.comment = dto.comment
    userToUpdate.token_fcm = null

    await this.firebaseUidsService.deleteByUser(dto.iduser)
    await userToUpdate.save()
    return userToUpdate
  }

  async deleteUserByEmail(email: string) {
    const userToUpdate = await this.userRepository.findOne({
      where: { email },
    })
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }

    userToUpdate.active = false
    userToUpdate.email = 'delete@delete.com'
    userToUpdate.phone_number = '000000000'
    userToUpdate.comment = 'borrado desde swagger'
    userToUpdate.token_fcm = null

    await this.firebaseUidsService.deleteByUser(userToUpdate.iduser)
    await userToUpdate.save()
    return userToUpdate
  }

  async generateUsername(idUser: number) {
    const userToUpdate: User = await this.userRepository.findOne({
      where: { iduser: idUser },
    })
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    if (!userToUpdate.name || !userToUpdate.email) {
      throw new BadRequestException(Messages.NAME_OR_EMAIL_NOT_EXIST[language.code])
    }
    const username = new FunctionService().generateUsername(userToUpdate)
    userToUpdate.username = username
    await userToUpdate.save()
    return userToUpdate
  }

  async getAllUsers() {
    return await this.userRepository.findAll({
      include: [
        {
          all: true,
        },
      ],
    })
  }

  async getAllToAdmin(offset: number, pageSize: number, searchTerm: string | null, userType: number | null) {
    const { count, rows: users } = await this.userRepository.findAndCountAll({
      attributes: { exclude: ['password', 'token_fcm', 'firebase_uid', 'uid_firebase'] },
      order: [['iduser', 'DESC']],
      where: {
        ...(searchTerm
          ? {
              [Op.or]: [
                { name: { [Op.iLike]: `%${searchTerm}%` } },
                { surname: { [Op.iLike]: `%${searchTerm}%` } },
                { email: { [Op.iLike]: `%${searchTerm}%` } },
                { username: { [Op.iLike]: `%${searchTerm}%` } },
              ],
            }
          : {}),
        user_type: userType ? userType : { [Op.not]: 5 },
      },
      offset,
      limit: pageSize,
      include: [
        {
          model: File,
          as: 'file_profiles',
          attributes: ['url'],
          where: {
            idfile: {
              [Op.in]: Sequelize.literal('(SELECT MAX(idfile) FROM files WHERE idgallery = "User"."file_profile_picture")'),
            },
          },
          required: false,
        },
        {
          model: Country,
          as: 'country',
          attributes: {
            include: [[`country_name_${language.code}`, 'country_name']],
            exclude: ['country_name_en', 'country_name_es'],
          },
        },
        {
          model: Address,
          as: 'address',
          include: [
            {
              model: City,
              include: [
                {
                  model: Country,
                  as: 'country',
                  attributes: {
                    include: [[`country_name_${language.code}`, 'country_name']],
                    exclude: ['country_name_en', 'country_name_es'],
                  },
                },
              ],
            },
          ],
        },
      ],
    })
    const totalPages = Math.ceil(count / pageSize)
    return {
      users,
      totalRows: count,
      totalPages,
    }
  }

  async getUserResume(idUser: number) {
    return await this.userRepository.findOne({
      where: {
        iduser: idUser,
      },
      attributes: { exclude: ['password', 'token_fcm', 'firebase_uid', 'uid_firebase'] },
      include: [
        {
          model: File,
          as: 'file_profiles',
          attributes: ['url'],
          where: {
            idfile: {
              [Op.in]: Sequelize.literal('(SELECT MAX(idfile) FROM files WHERE idgallery = "User"."file_profile_picture")'),
            },
          },
          required: false,
        },
        {
          model: Country,
          as: 'country',
          attributes: {
            include: [[`country_name_${language.code}`, 'country_name']],
            exclude: ['country_name_en', 'country_name_es'],
          },
        },
        {
          model: Address,
          as: 'address',
          include: [
            {
              model: City,
              include: [
                {
                  model: Country,
                  as: 'country',
                  attributes: {
                    include: [[`country_name_${language.code}`, 'country_name']],
                    exclude: ['country_name_en', 'country_name_es'],
                  },
                },
              ],
            },
          ],
        },
        { model: FirebaseUid, attributes: ['uid_reference'] },
      ],
    })
  }

  async getUserDetail(idUser: number) {
    return await this.userRepository.findOne({
      where: {
        iduser: idUser,
      },
      attributes: { exclude: ['password', 'token_fcm', 'firebase_uid', 'uid_firebase'] },
      include: [
        {
          model: File,
          as: 'file_profiles',
          attributes: ['url'],
          where: {
            idfile: {
              [Op.in]: Sequelize.literal('(SELECT MAX(idfile) FROM files WHERE idgallery = "User"."file_profile_picture")'),
            },
          },
          required: false,
        },
        {
          model: Country,
          as: 'country',
          attributes: {
            include: [[`country_name_${language.code}`, 'country_name']],
            exclude: ['country_name_en', 'country_name_es'],
          },
        },
        {
          model: Address,
          as: 'address',
          include: [
            {
              model: City,
              include: [
                {
                  model: Country,
                  as: 'country',
                  attributes: {
                    include: [[`country_name_${language.code}`, 'country_name']],
                    exclude: ['country_name_en', 'country_name_es'],
                  },
                },
              ],
            },
          ],
        },
        { model: FirebaseUid, attributes: ['uid_reference'] },
        {
          model: Seller,
          include: [
            {
              model: Address,
              include: [
                {
                  model: City,
                  include: [
                    {
                      model: Country,
                      as: 'country',
                      attributes: {
                        include: [[`country_name_${language.code}`, 'country_name']],
                        exclude: ['country_name_en', 'country_name_es'],
                      },
                    },
                  ],
                },
              ],
            },
            {
              model: User,
              attributes: { exclude: ['password', 'token_fcm', 'firebase_uid', 'uid_firebase'] },
              as: 'legal_representative',
              include: [
                {
                  model: File,
                  as: 'file_profiles',
                  attributes: ['url'],
                  where: {
                    idfile: {
                      [Op.in]: Sequelize.literal('(SELECT MAX(idfile) FROM files WHERE idgallery = "User"."file_profile_picture")'),
                    },
                  },
                  required: false,
                },
                {
                  model: Country,
                  as: 'country',
                  attributes: {
                    include: [[`country_name_${language.code}`, 'country_name']],
                    exclude: ['country_name_en', 'country_name_es'],
                  },
                },
                {
                  model: Address,
                  as: 'address',
                  include: [
                    {
                      model: City,
                      include: [
                        {
                          model: Country,
                          as: 'country',
                          attributes: {
                            include: [[`country_name_${language.code}`, 'country_name']],
                            exclude: ['country_name_en', 'country_name_es'],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              model: FileGalleries,
              as: 'company_constitution_galleries',
              include: [
                {
                  model: File,
                  where: {
                    status: true,
                  },
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'main_file', 'status'],
                  },
                  limit: Number.MAX_SAFE_INTEGER,
                  order: [['idfile', 'DESC']],
                },
              ],
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: FileGalleries,
              as: 'identity_verification_galleries',
              include: [
                {
                  model: File,
                  where: {
                    status: true,
                  },
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'main_file', 'status'],
                  },
                  limit: Number.MAX_SAFE_INTEGER,
                  order: [['idfile', 'DESC']],
                },
              ],
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
    })
  }

  async getUserByEmail(email) {
    return await this.userRepository.findOne({
      where: { email, user_type: { [Op.ne]: 5 } },
    })
  }

  async getUserByPhoneNumber(phoneNumber) {
    return await this.userRepository.findOne({
      where: { phone_number: phoneNumber, user_type: { [Op.ne]: 5 } },
    })
  }

  async getById(idUser) {
    return await this.userRepository.findOne({
      where: {
        iduser: idUser,
      },
      include: [
        {
          all: true,
        },
        {
          model: FirebaseUid,
          where: {
            uid_reference: {
              [Op.ne]: 'phone',
            },
          },
        },
        {
          model: FileGalleries,
          as: 'file_profile',
          include: [
            {
              model: File,
              where: {
                status: true,
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'main_file', 'status'],
              },
              limit: 1,
              order: [['idfile', 'DESC']],
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    })
  }

  async verifyNumberAndEmail(phoneNumber: string, email: string) {
    return await this.userRepository.findOne({
      where: {
        phone_number: phoneNumber,
        email: email,
      },
      include: [
        {
          model: FirebaseUid,
        },
      ],
    })
  }
  async verifyCompleteProfile(id: number) {
    const userToUpdate = await this.userRepository.findOne({
      where: { iduser: id },
    })
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    const profile = await this.userRepository.findOne({
      where: {
        iduser: id,
        username: { [Op.not]: null },
        email: { [Op.not]: null },
        name: { [Op.not]: null },
        surname: { [Op.not]: null },
        phone_number: { [Op.not]: null },
        document_number: { [Op.not]: null },
        file_profile_picture: { [Op.not]: null },
        birthdate: { [Op.not]: null },
        sex: { [Op.not]: null },
        idcountry: { [Op.not]: null },
      },
    })
    const addressReception = await this.addressService.getAddressReception(id)
    return { profile: profile ? true : false, delivery_address: addressReception ? true : false }
  }

  async updateDuplicTokenFcm(tokenFcm: string) {
    return await this.userRepository.update({ token_fcm: '' }, { where: { token_fcm: tokenFcm } })
  }

  async updateFileDocuments(id: number, fileDocuments: number) {
    const userToUpdate = await this.userRepository.findOne({
      where: { iduser: id },
    })
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    userToUpdate.file_documents = fileDocuments
    await userToUpdate.save()
    return userToUpdate
  }
}
