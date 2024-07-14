import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiCustomResponse } from 'src/decorators/api-custom-response.decorator'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { HttpResponse } from 'src/response/http.response'

import { ModulesAdmin } from './modules-admin.model'
import { ModulesAdminService } from './modules-admin.service'

@ApiBearerAuth()
@ApiTags('Modules admin')
@ApiExtraModels(ModulesAdmin)
@Controller('admin/modules')
export class ModulesAdminController {
  constructor(private readonly modulesAdminService: ModulesAdminService) {}

  @ApiOperation({ summary: 'Getting all admin roles' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_ALL[language.code], 'ModulesAdmin', '', true)
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAll() {
    try {
      const data = await this.modulesAdminService.getAll()
      return HttpResponse.success(data, Messages.GET_ALL_ADMIN_ROLES[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
