import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'
import sequelize from 'sequelize'

import { UpdateRolesAdminDto } from './dto/update-roles-admin.dto'
import { CreateRoleAdminDto } from './dto/create-roles-admin.dto'
import { RoleAdmin } from './roles-admin.model'

@Injectable()
export class RolesAdminService {
  constructor(@InjectModel(RoleAdmin) private roleAdminRepository: typeof RoleAdmin) {}

  async getAll() {
    const roles = await this.roleAdminRepository.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM users_admin
              WHERE users_admin.idrole_admin = "RoleAdmin"."idrole_admin"
            )`),
            'user_count',
          ],
        ],
      },
      include: [
        {
          all: true,
        },
      ],
    })

    return roles
  }

  async create(dto: CreateRoleAdminDto) {
    return await this.roleAdminRepository.create(dto)
  }

  async update(id: number, updateDto: UpdateRolesAdminDto): Promise<RoleAdmin> {
    const roleAdmin = await this.roleAdminRepository.findByPk(id)
    if (!roleAdmin) {
      throw new NotFoundException(Messages.ROLE_ADMIN_NOT_FOUND_ID[language.code])
    }
    await this.roleAdminRepository.update(updateDto, { where: { idrole_admin: id } })
    return this.roleAdminRepository.findByPk(id)
  }

  async getById(id) {
    return await this.roleAdminRepository.findOne({ where: { idrole_admin: id } })
  }
}
