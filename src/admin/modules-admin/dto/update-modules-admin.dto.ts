import { PartialType } from '@nestjs/swagger'

import { CreateModulesAdminDto } from './create-modules-admin.dto'

export class UpdateModulesAdminDto extends PartialType(CreateModulesAdminDto) {}
