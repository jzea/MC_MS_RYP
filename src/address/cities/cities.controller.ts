import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CitiesService } from './cities.service'

/**
 * Controller responsible for handling requests related to cities.
 */
@ApiBearerAuth()
@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
}
