import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { CitiesService } from './cities.service'
import { CitiesController } from './cities.controller'
import { City } from './city.model'

@Module({
  controllers: [CitiesController],
  imports: [SequelizeModule.forFeature([City]), forwardRef(() => AuthModule)],
  providers: [CitiesService],
})
export class CitiesModule {}
