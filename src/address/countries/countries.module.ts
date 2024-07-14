import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { CountriesService } from './countries.service'
import { CountriesController } from './countries.controller'
import { Country } from './country.model'

@Module({
  controllers: [CountriesController],
  imports: [SequelizeModule.forFeature([Country]), forwardRef(() => AuthModule)],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
