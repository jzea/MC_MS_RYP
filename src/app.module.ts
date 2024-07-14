import * as path from 'path'

import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { FilesModule } from './files/files.module'
import { FirebaseUidsModule } from './firebase-uids/firebase-uids.module'
import { SellersModule } from './sellers/sellers.module'
import { AppTypesModule } from './app-types/app-types.module'
import { FileGalleriesModule } from './file-galleries/file-galleries.module'
import { AddressModule } from './address/address.module'
import { CitiesModule } from './address/cities/cities.module'
import { CountriesModule } from './address/countries/countries.module'
import { RegionsModule } from './address/regions/regions.module'
import { HttpHeaderInterceptor } from './auth/http_header_interceptor'
import { UsersAdminModule } from './admin/users-admin/users-admin.module'
import { RolesAdminModule } from './admin/roles-admin/roles-admin.module'
import { PermissionsRolesAdminModule } from './admin/permissions-roles-admin/permissions-roles-admin.module'
import { PermissionsAdminModule } from './admin/permissions-admin/permissions-admin.module'
import { ModulesAdminModule } from './admin/modules-admin/modules-admin.module'
import { ReceivingPortModule } from './receiving-port/receiving-port.module'
import { VirtualWalletModule } from './virtual-wallet/virtual-wallet.module'

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpHeaderInterceptor,
    },
  ],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 25060,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      autoLoadModels: true,
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    FirebaseUidsModule,
    SellersModule,
    AppTypesModule,
    FileGalleriesModule,
    AddressModule,
    CitiesModule,
    CountriesModule,
    RegionsModule,
    UsersAdminModule,
    RolesAdminModule,
    PermissionsRolesAdminModule,
    PermissionsAdminModule,
    ModulesAdminModule,
    ReceivingPortModule,
    VirtualWalletModule,
  ],
})
export class AppModule {}
