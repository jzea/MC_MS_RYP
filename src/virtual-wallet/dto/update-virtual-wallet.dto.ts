import { PartialType } from '@nestjs/swagger'

import { CreateVirtualWalletDto } from './create-virtual-wallet.dto'

export class UpdateVirtualWalletDto extends PartialType(CreateVirtualWalletDto) {}
