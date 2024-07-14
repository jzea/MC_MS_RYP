import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger'

import { ReceivingPortService } from './receiving-port.service'

@Controller('receiving-port')
@ApiBearerAuth()
@ApiTags('Receiving Port')
@ApiExtraModels(ReceivingPortService)
export class ReceivingPortController {
  constructor(private readonly receivingPortService: ReceivingPortService) {}
}
