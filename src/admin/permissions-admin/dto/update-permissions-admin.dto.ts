import { PartialType } from '@nestjs/swagger'

import { CreatePermissionsAdminDto } from './create-permissions-admin.dto'

export class UpdatePermissionsAdminDto extends PartialType(CreatePermissionsAdminDto) {}
