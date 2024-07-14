import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { AuthModule } from '../auth/auth.module'

import { FirebaseUidsService } from './firebase-uids.service'
import { FirebaseUidsController } from './firebase-uids.controller'
import { FirebaseUid } from './firebase-uid.model'

@Module({
  controllers: [FirebaseUidsController],
  providers: [FirebaseUidsService],
  imports: [SequelizeModule.forFeature([FirebaseUid]), forwardRef(() => AuthModule)],
  exports: [FirebaseUidsService],
})
export class FirebaseUidsModule {}
