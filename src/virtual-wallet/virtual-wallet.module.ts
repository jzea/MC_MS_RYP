import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { VirtualWalletService } from './virtual-wallet.service'
import { VirtualWalletController } from './virtual-wallet.controller'
import { VirtualWallet } from './virtual-wallet.model'

@Module({
  controllers: [VirtualWalletController],
  imports: [SequelizeModule.forFeature([VirtualWallet]), forwardRef(() => VirtualWallet)],
  providers: [VirtualWalletService],
  exports: [VirtualWalletService],
})
export class VirtualWalletModule {}
