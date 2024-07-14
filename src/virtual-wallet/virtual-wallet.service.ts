import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction } from 'sequelize'

import { CreateVirtualWalletDto } from './dto/create-virtual-wallet.dto'
import { VirtualWallet } from './virtual-wallet.model'

@Injectable()
export class VirtualWalletService {
  constructor(@InjectModel(VirtualWallet) private virtualWalletRepository: typeof VirtualWallet) {}

  async create(dto: CreateVirtualWalletDto, transaction?: Transaction) {
    const options = transaction ? { transaction } : undefined
    dto.available_balance = 0
    dto.retained_balance = 0
    return await this.virtualWalletRepository.create(dto, options)
  }
}
