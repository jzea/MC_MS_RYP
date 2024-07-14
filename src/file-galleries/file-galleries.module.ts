import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { FileGalleriesService } from './file-galleries.service'
import { FileGalleriesController } from './file-galleries.controller'
import { FileGalleries } from './file-galleries.model'

@Module({
  controllers: [FileGalleriesController],
  imports: [SequelizeModule.forFeature([FileGalleries]), forwardRef(() => AuthModule)],
  providers: [FileGalleriesService],
})
export class FileGalleriesModule {}
