import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { CountriesModule } from 'src/address/countries/countries.module'
import { HttpModule } from '@nestjs/axios'
import { VirtualWalletModule } from 'src/virtual-wallet/virtual-wallet.module'

import { FirebaseUidsModule } from '../firebase-uids/firebase-uids.module'
import { UsersModule } from '../users/users.module'

import { NotificationService } from './notifications.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MailsService } from './mails.service'

@Module({
  providers: [AuthService, NotificationService, MailsService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => FirebaseUidsModule),
    forwardRef(() => CountriesModule),
    forwardRef(() => VirtualWalletModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY ?? 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    HttpModule,
  ],
  exports: [AuthService, JwtModule, NotificationService, MailsService],
})
export class AuthModule {}
