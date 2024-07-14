import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { RegionsService } from './regions.service'
import { RegionsController } from './regions.controller'
import { Region } from './region.model'

@Module({
  controllers: [RegionsController],
  imports: [SequelizeModule.forFeature([Region]), forwardRef(() => AuthModule)],
  providers: [RegionsService],
})
export class RegionsModule {}
