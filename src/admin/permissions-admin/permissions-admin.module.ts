import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { PermissionsAdminService } from './permissions-admin.service'
import { PermissionsAdminController } from './permissions-admin.controller'
import { PermissionsAdmin } from './permissions-admin.model'

@Module({
  controllers: [PermissionsAdminController],
  imports: [SequelizeModule.forFeature([PermissionsAdmin]), forwardRef(() => AuthModule)],
  providers: [PermissionsAdminService],
})
export class PermissionsAdminModule {}
