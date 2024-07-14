import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { language } from 'src/main'
import { Messages } from 'src/utils/messages.enum'

import { RoleAdmin } from '../roles-admin/roles-admin.model'
import { PermissionsAdmin } from '../permissions-admin/permissions-admin.model'
import { ModulesAdmin } from '../modules-admin/modules-admin.model'
import { RolesAdminService } from '../roles-admin/roles-admin.service'

import { BlockPermissionsRolesAdminDto } from './dto/block-permissions-roles-admin.dto'
import { PermissionsRoleAdmin } from './permissions-roles-admin.model'
import { CreatePermissionsRolesAdminDto } from './dto/create-permissions-roles-admin.dto'

@Injectable()
export class PermissionsRolesAdminService {
  constructor(@InjectModel(PermissionsRoleAdmin) private permissionsRoleAdminRepository: typeof PermissionsRoleAdmin, private rolesAdminService: RolesAdminService) {}

  async getAll() {
    return await this.permissionsRoleAdminRepository.findAll({
      attributes: ['idrole_admin', 'createdAt'],
      include: [
        {
          model: RoleAdmin,
          attributes: ['name_role'],
        },
        {
          model: PermissionsAdmin,
          attributes: ['name_permission'],
          include: [
            {
              model: ModulesAdmin,
              attributes: ['idmodule_admin', 'name_module'],
            },
          ],
        },
      ],
    })
  }
  async create(dto: CreatePermissionsRolesAdminDto) {
    const existingAssignment = await this.permissionsRoleAdminRepository.findOne({
      where: { idpermission_admin: dto.idpermission_admin, idrole_admin: dto.idrole_admin },
    })

    if (existingAssignment) {
      throw new BadRequestException(Messages.PERMISSION_ALREADY_ASSIGNED_TO_ROLE[language.code])
    }
    return await this.permissionsRoleAdminRepository.create(dto)
  }

  async createInBlock(blockPermissionsRolesAdminDto: BlockPermissionsRolesAdminDto[], idRoleAdmin: number) {
    console.log(JSON.stringify(blockPermissionsRolesAdminDto))

    for (const dto of blockPermissionsRolesAdminDto) {
      const existingAssignment = await this.permissionsRoleAdminRepository.findOne({
        where: { idpermission_admin: dto.idpermission_admin, idrole_admin: idRoleAdmin },
      })
      if (existingAssignment) {
        if (dto.status == false) {
          await this.permissionsRoleAdminRepository.destroy({
            where: {
              idpermission_role_admin: existingAssignment.idpermission_role_admin,
            },
          })
        }
      } else {
        if (dto.status) {
          await this.permissionsRoleAdminRepository.create({ idpermission_admin: dto.idpermission_admin, idrole_admin: idRoleAdmin })
        }
      }
    }

    return this.getDataByIdRoleAdmin(idRoleAdmin)
  }

  async getDataByIdRoleAdmin(id) {
    const permissions = await this.permissionsRoleAdminRepository.findAll({
      where: {
        idrole_admin: id,
      },
      attributes: ['idrole_admin', 'createdAt'],
      include: [
        {
          model: PermissionsAdmin,
          attributes: ['idpermission_admin', 'name_permission'],
          include: [
            {
              model: ModulesAdmin,
              attributes: ['idmodule_admin', 'name_module'],
            },
          ],
        },
      ],
    })
    const role = await this.rolesAdminService.getById(id)
    return { role, permissions }
  }

  async getByIdRoleAdmin(id) {
    return await this.permissionsRoleAdminRepository.findAll({
      where: {
        idrole_admin: id,
      },
      attributes: ['idrole_admin', 'createdAt'],
      include: [
        {
          model: PermissionsAdmin,
          attributes: ['idpermission_admin', 'name_permission'],
          include: [
            {
              model: ModulesAdmin,
              attributes: ['idmodule_admin', 'name_module'],
            },
          ],
        },
      ],
    })
  }
  async delete(id: number) {
    return await this.permissionsRoleAdminRepository.destroy({
      where: {
        idpermission_role_admin: id,
      },
    })
  }
}
