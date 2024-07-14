import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { AddressService } from './address.service'
import { AddressController } from './address.controller'
import { Address } from './address.model'

@Module({
  controllers: [AddressController],
  imports: [SequelizeModule.forFeature([Address]), forwardRef(() => AuthModule)],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
