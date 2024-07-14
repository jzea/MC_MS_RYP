import { PartialType } from '@nestjs/swagger'

import { CreateFileGalleryDto } from './create-file-galleries.dto'

export class UpdateFileGalleryDto extends PartialType(CreateFileGalleryDto) {}
