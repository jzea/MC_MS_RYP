import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { File } from 'src/files/file.model'
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto'
import { Op, Sequelize } from 'sequelize'

import { RoleAdmin } from '../roles-admin/roles-admin.model'

import { UpdateUsersAdminDto } from './dto/update-users-admin.dto'
import { UserAdmin } from './users-admin.model'
import { CreateUserAdminDto } from './dto/create-users-admin.dto'

@Injectable()
export class UsersAdminService {
  constructor(@InjectModel(UserAdmin) private userAdminRepository: typeof UserAdmin, private jwtService: JwtService) {}

  async create(dto: CreateUserAdminDto) {
    if (dto.email) {
      const userEmail = await this.getAdminByEmail(dto.email)
      if (userEmail) {
        throw new BadRequestException(Messages.EMAIL_ALREADY_IN_USE[language.code])
      }
    }
    dto.password = await bcrypt.hash(dto.password, 10)
    const user = await this.userAdminRepository.create(dto)
    const token = await this.generateToken(user)
    const userUpdate = await this.getById(user.iduser_admin)
    return { user: userUpdate, token }
  }

  async update(id: number, updateDto: UpdateUsersAdminDto): Promise<UserAdmin> {
    const user = await this.userAdminRepository.findByPk(id)
    if (updateDto.email && updateDto.email != user.email) {
      const userEmail = await this.getAdminByEmail(updateDto.email)
      if (userEmail) {
        throw new BadRequestException(Messages.EMAIL_ALREADY_IN_USE[language.code])
      }
    }
    if (!user) {
      throw new NotFoundException(Messages.ADMIN_USER_NOT_FOUND[language.code])
    }
    await this.userAdminRepository.update(updateDto, { where: { iduser_admin: id } })
    return this.getById(id)
  }

  async getAll() {
    const results = await this.userAdminRepository.findAll({
      attributes: {
        exclude: ['photo_idgallery', 'idrole_admin', 'password'],
      },
      include: [
        {
          model: RoleAdmin,
          attributes: ['idrole_admin', 'name_role'],
        },
        {
          model: File,
          as: 'file_profile',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'idfile', 'main_file', 'idgallery', 'name', 'status'],
          },
          where: {
            idfile: {
              [Op.in]: Sequelize.literal('(SELECT MAX(idfile) FROM files WHERE idgallery = "UserAdmin"."photo_idgallery")'),
            },
          },
          required: false,
        },
      ],
      order: [['iduser_admin', 'DESC']],
    })

    return results
  }

  async getById(id) {
    return await this.userAdminRepository.findOne({
      where: {
        iduser_admin: id,
      },
      attributes: {
        exclude: ['photo_idgallery', 'idrole_admin', 'password'],
      },
      include: [
        {
          model: RoleAdmin,
          attributes: ['idrole_admin', 'name_role'],
        },
        {
          model: File,
          as: 'file_profile',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'idfile', 'main_file', 'idgallery', 'name', 'status'],
          },
          order: [['idfile', 'DESC']],
        },
      ],
    })
  }
  async getAdminByEmail(email) {
    return await this.userAdminRepository.findOne({
      where: { email },
    })
  }
  async generateToken(userAdmin: UserAdmin) {
    const payload = { email: userAdmin.email, id: userAdmin.iduser_admin }
    const expiresIn = '365d'
    return this.jwtService.sign(payload, { expiresIn })
  }
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto)
    const token = await this.generateToken(user)
    return { user, token }
  }

  private async validateUser(userDto: LoginUserDto) {
    const candidate = await this.getAdminByEmail(userDto.email)
    if (!candidate) {
      throw new BadRequestException(Messages.EMAIL_NOT_REGISTERED[language.code])
    }
    const isPassCorrect = await bcrypt.compare(userDto.password, candidate.password || '')
    if (candidate && isPassCorrect) {
      const user = await this.getById(candidate.iduser_admin)
      return user
    }

    throw new BadRequestException(Messages.INCORRECT_PASSWORD[language.code])
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const userToUpdate = await this.userAdminRepository.findOne({
      where: { iduser_admin: id },
    })
    if (!userToUpdate) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    const hashPassword = await bcrypt.hash(dto.password, 10)
    userToUpdate.password = hashPassword
    await userToUpdate.save()
    const userAdmin = await this.getById(id)
    return userAdmin
  }
}
