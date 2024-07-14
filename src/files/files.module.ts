import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'

import { FilesService } from './files.service'
import { FilesController } from './files.controller'
import { File } from './file.model'
@Module({
  controllers: [FilesController],
  imports: [SequelizeModule.forFeature([File]), forwardRef(() => AuthModule)],
  providers: [FilesService],
})
export class FilesModule {}
