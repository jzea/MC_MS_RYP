import { Module, forwardRef } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'src/users/users.module'
import { SellersModule } from 'src/sellers/sellers.module'

import { UserAdmin } from './users-admin.model'
import { UsersAdminController } from './users-admin.controller'
import { UsersAdminService } from './users-admin.service'

@Module({
  controllers: [UsersAdminController],
  imports: [
    SequelizeModule.forFeature([UserAdmin]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    forwardRef(() => SellersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY ?? 'SECRET',
      signOptions: {
        expiresIn: '365d',
      },
    }),
  ],
  providers: [UsersAdminService],
})
export class UsersAdminModule {}
