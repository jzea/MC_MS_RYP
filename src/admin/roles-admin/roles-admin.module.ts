import { Module, forwardRef } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { SequelizeModule } from '@nestjs/sequelize'

import { RolesAdminService } from './roles-admin.service'
import { RolesAdminController } from './roles-admin.controller'
import { RoleAdmin } from './roles-admin.model'

@Module({
  controllers: [RolesAdminController],
  imports: [SequelizeModule.forFeature([RoleAdmin]), forwardRef(() => AuthModule)],
  providers: [RolesAdminService],
  exports: [RolesAdminService],
})
export class RolesAdminModule {}
