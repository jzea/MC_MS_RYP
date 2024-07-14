import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'

import { AddressModule } from '../address/address.module'

import { SellersService } from './sellers.service'
import { SellersController } from './sellers.controller'
import { Seller } from './seller.model'

@Module({
  controllers: [SellersController],
  imports: [forwardRef(() => AddressModule), forwardRef(() => UsersModule), SequelizeModule.forFeature([Seller]), forwardRef(() => AuthModule)],
  providers: [SellersService],
  exports: [SellersService],
})
export class SellersModule {}
