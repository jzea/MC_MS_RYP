import { Controller } from '@nestjs/common'

import { VirtualWalletService } from './virtual-wallet.service'

@Controller('virtual-wallet')
export class VirtualWalletController {
  constructor(private readonly virtualWalletService: VirtualWalletService) {}
}
