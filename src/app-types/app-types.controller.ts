import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Messages } from 'src/utils/messages.enum'
import { ApiCustomResponse } from 'src/decorators/api-custom-response.decorator'
import { HttpResponse } from 'src/response/http.response'
import { language } from 'src/main'

import { AppType } from './app-type.model'
import { AppTypesService } from './app-types.service'

/**
 * Controller responsible for handling requests related to application types.
 */
@ApiTags('App types')
@Controller('app-types')
@ApiExtraModels(AppType)
export class AppTypesController {
  constructor(private readonly appTypesService: AppTypesService) {}

  /**
   * Retrieves all application types.
   * @returns Response containing the list of application types.
   */
  @ApiOperation({ summary: Messages.GET_ALL[language.code] })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_ALL[language.code], 'AppType', '', true)
  @Get()
  async getAll() {
    try {
      const data = await this.appTypesService.getAll()
      return HttpResponse.success(data, Messages.GET_ALL[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
