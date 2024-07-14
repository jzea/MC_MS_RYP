import { PartialType } from '@nestjs/swagger'

import { CreateReceivingPortDto } from './create-receiving-port.dto'

export class UpdateReceivingPortDto extends PartialType(CreateReceivingPortDto) {}
