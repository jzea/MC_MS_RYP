import { PartialType } from '@nestjs/swagger'

import { CreateAppTypeDto } from './create-app-type.dto'

export class UpdateAppTypeDto extends PartialType(CreateAppTypeDto) {}
