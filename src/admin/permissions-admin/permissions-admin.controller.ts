import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags, ApiExtraModels } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { HttpResponse } from 'src/response/http.response'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'

import { PermissionsAdmin } from './permissions-admin.model'
import { PermissionsAdminService } from './permissions-admin.service'

@ApiBearerAuth()
@ApiTags('Permissions admin')
@ApiExtraModels(PermissionsAdmin)
@Controller('admin/permissions')
export class PermissionsAdminController {
  constructor(private readonly permissionsAdminService: PermissionsAdminService) {}

  @ApiOperation({ summary: 'Getting all admin permissions' })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAll() {
    try {
      const data = await this.permissionsAdminService.getAll()
      return HttpResponse.success(data, Messages.GET_ALL[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
