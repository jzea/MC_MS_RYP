import { Controller } from '@nestjs/common'

import { CountriesService } from './countries.service'

/**
 * Controller responsible for handling requests related to countries.
 */
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}
}
