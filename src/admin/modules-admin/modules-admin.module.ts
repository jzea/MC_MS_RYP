import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { ModulesAdminService } from './modules-admin.service'
import { ModulesAdminController } from './modules-admin.controller'
import { ModulesAdmin } from './modules-admin.model'

@Module({
  controllers: [ModulesAdminController],
  imports: [SequelizeModule.forFeature([ModulesAdmin]), forwardRef(() => AuthModule)],
  providers: [ModulesAdminService],
})
export class ModulesAdminModule {}
