import { Controller } from '@nestjs/common'

import { RegionsService } from './regions.service'

/**
 * Controller responsible for handling requests related to regions.
 */
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}
}
