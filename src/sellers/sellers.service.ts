import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.model'
import { City } from 'src/address/cities/city.model'
import { Country } from 'src/address/countries/country.model'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'
import { FileGalleries } from 'src/file-galleries/file-galleries.model'
import { File } from 'src/files/file.model'
import { Sequelize, Transaction } from 'sequelize'
import { Op } from 'sequelize'
import { MailsService } from 'src/auth/mails.service'

import { Address } from '../address/address.model'
import { AddressService } from '../address/address.service'

import { Seller } from './seller.model'
import { CreateSellerDto } from './dto/create-seller.dto'

@Injectable()
export class SellersService {
  constructor(private addressService: AddressService, private userService: UsersService, @InjectModel(Seller) private sellerRepository: typeof Seller, private mailService: MailsService) {}

  async create(iduser: number, createSellerDto: CreateSellerDto, transaction: Transaction) {
    const user = await this.getSellerByUser(iduser)
    if (user) {
      throw new BadRequestException(Messages.USER_ALREADY_SELLER[language.code])
    }

    await this.userService.updateUserType(iduser, 2)
    createSellerDto.iduser = iduser
    const address: Address = await this.addressService.create(createSellerDto, transaction)
    createSellerDto.idaddress = address.idaddress
    return await this.sellerRepository.create(createSellerDto, { transaction })
  }

  async update(iduser: number, createSellerDto: CreateSellerDto) {
    const seller = await this.getSellerByUser(iduser)
    if (seller == null) {
      throw new BadRequestException(Messages.NO_SELLER_FOR_USER[language.code])
    }

    await this.addressService.update(seller.idaddress, createSellerDto)

    if (createSellerDto.whatsapp_number !== undefined) {
      seller.whatsapp_number = createSellerDto.whatsapp_number
    }
    seller.number_rut = createSellerDto.number_rut || seller.number_rut
    seller.website = createSellerDto.website || seller.website
    seller.company_name = createSellerDto.company_name || seller.company_name
    seller.company_email = createSellerDto.company_email || seller.company_email
    seller.company_phone = createSellerDto.company_phone || seller.company_phone
    seller.file_company_constitution = createSellerDto.file_company_constitution
    seller.type_seller = createSellerDto.type_seller || seller.type_seller
    seller.idlegal_representative = createSellerDto.idlegal_representative || seller.idlegal_representative
    seller.file_identity_verification = createSellerDto.file_identity_verification || seller.file_identity_verification

    return await seller.save()
  }

  async updateByAdmin(iduser: number, createSellerDto: CreateSellerDto) {
    const seller = await this.getSellerByUser(iduser)
    if (seller == null) {
      throw new BadRequestException(Messages.NO_SELLER_FOR_USER[language.code])
    }

    await this.addressService.update(seller.idaddress, createSellerDto)

    if (createSellerDto.whatsapp_number !== undefined) {
      seller.whatsapp_number = createSellerDto.whatsapp_number
    }
    seller.number_rut = createSellerDto.number_rut || seller.number_rut
    seller.website = createSellerDto.website || seller.website
    seller.company_name = createSellerDto.company_name || seller.company_name
    seller.company_email = createSellerDto.company_email || seller.company_email
    seller.company_phone = createSellerDto.company_phone || seller.company_phone
    seller.file_company_constitution = createSellerDto.file_company_constitution
    seller.type_seller = createSellerDto.type_seller || seller.type_seller
    seller.idlegal_representative = createSellerDto.idlegal_representative || seller.idlegal_representative
    seller.file_identity_verification = createSellerDto.file_identity_verification || seller.file_identity_verification
    await seller.save()
    return this.getById(seller.idseller)
  }

  async getById(id: number) {
    return await this.sellerRepository.findOne({
      where: {
        idseller: id,
      },
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
                  [Op.in]: Sequelize.literal('(SELECT MAX(idfile) FROM files WHERE idgallery = "legal_representative"."file_profile_picture")'),
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
    })
  }
  async getSellerByUser(id) {
    return await this.sellerRepository.findOne({
      where: { iduser: id },
      include: [
        {
          model: Address,
          required: true,
          include: [
            {
              model: City,
              include: [
                {
                  model: Country,
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: 'legal_representative',
          include: [
            {
              model: Address,
              as: 'address',
              include: [
                {
                  model: City,
                  include: [
                    {
                      model: Country,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })
  }
  async deleteByUser(idUser: number) {
    return await this.sellerRepository.destroy({
      where: {
        iduser: idUser,
      },
    })
  }

  async updateApproved(id: number, approved: boolean) {
    const sellerToUpdate = await this.sellerRepository.findOne({
      where: { iduser: id },
    })
    if (!sellerToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    sellerToUpdate.approved = approved
    await sellerToUpdate.save()
    if (approved) {
      this.mailService.sendEmailSeller(id)
    }
    return this.getById(sellerToUpdate.idseller)
  }
}
