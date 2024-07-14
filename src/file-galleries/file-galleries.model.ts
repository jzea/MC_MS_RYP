import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { File } from 'src/files/file.model'
interface FileGalleryCreationAttrs {
  idgallery: number
}

@Table({ tableName: 'file_gallerys' })
export class FileGalleries extends Model<FileGalleries, FileGalleryCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the file gallery' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idgallery' })
  idgallery: number

  @HasMany(() => File)
  files: File[]
}
