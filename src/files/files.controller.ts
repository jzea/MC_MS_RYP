import { Controller } from '@nestjs/common'

import { FilesService } from './files.service'

/**
 * Controller responsible for handling requests related to files.
 */
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
}
