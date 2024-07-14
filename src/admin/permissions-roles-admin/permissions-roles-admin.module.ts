import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { RolesAdminModule } from '../roles-admin/roles-admin.module'

import { PermissionsRolesAdminService } from './permissions-roles-admin.service'
import { PermissionsRolesAdminController } from './permissions-roles-admin.controller'
import { PermissionsRoleAdmin } from './permissions-roles-admin.model'

@Module({
  controllers: [PermissionsRolesAdminController],
  imports: [SequelizeModule.forFeature([PermissionsRoleAdmin]), forwardRef(() => AuthModule), forwardRef(() => RolesAdminModule)],
  providers: [PermissionsRolesAdminService],
})
export class PermissionsRolesAdminModule {}
