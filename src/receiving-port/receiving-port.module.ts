import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { ReceivingPortService } from './receiving-port.service'
import { ReceivingPortController } from './receiving-port.controller'
import { ReceivingPort } from './receiving-port.model'

@Module({
  controllers: [ReceivingPortController],
  imports: [SequelizeModule.forFeature([ReceivingPort]), forwardRef(() => AuthModule)],
  providers: [ReceivingPortService],
})
export class ReceivingPortModule {}
