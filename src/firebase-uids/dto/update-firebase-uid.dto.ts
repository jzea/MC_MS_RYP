import { PartialType } from '@nestjs/swagger'

import { CreateFirebaseUidDto } from './create-firebase-uid.dto'

export class UpdateFirebaseUidDto extends PartialType(CreateFirebaseUidDto) {}
