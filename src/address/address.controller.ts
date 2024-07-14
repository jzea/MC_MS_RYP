import { Controller } from '@nestjs/common'

import { AddressService } from './address.service'

/**
 * Controller responsible for handling requests related to addresses.
 */
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
}
