import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { AppTypesService } from './app-types.service'
import { AppTypesController } from './app-types.controller'
import { AppType } from './app-type.model'

@Module({
  controllers: [AppTypesController],
  imports: [SequelizeModule.forFeature([AppType]), forwardRef(() => AuthModule)],
  providers: [AppTypesService],
})
export class AppTypesModule {}
