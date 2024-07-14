import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { FirebaseUidsModule } from 'src/firebase-uids/firebase-uids.module'
import { CountriesModule } from 'src/address/countries/countries.module'
import { AddressModule } from 'src/address/address.module'

import { AuthModule } from '../auth/auth.module'

import { User } from './user.model'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [forwardRef(() => FirebaseUidsModule), SequelizeModule.forFeature([User]), forwardRef(() => AuthModule), forwardRef(() => CountriesModule), forwardRef(() => AddressModule)],
  exports: [UsersService],
})
export class UsersModule {}
