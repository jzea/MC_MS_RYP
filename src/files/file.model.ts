import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { FileGalleries } from 'src/file-galleries/file-galleries.model'

interface FileCreationAttrs {
  url: string | null
  main_file: number | null
  idgallery: number
  name: string | null
}

@Table({ tableName: 'files' })
export class File extends Model<File, FileCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the file' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idfile' })
  idfile: number

  @ApiProperty({ example: 'https://example.com/file.pdf', description: 'URL of the file' })
  @Column({ type: DataType.STRING, allowNull: true, field: 'url' })
  url: string | null

  @ApiProperty({ example: true, description: 'Main file indicator' })
  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'main_file' })
  main_file: boolean | null

  @ForeignKey(() => FileGalleries)
  @ApiProperty({ example: 1, description: 'ID of the associated file gallery' })
  @Column({ type: DataType.INTEGER, field: 'idgallery' })
  idgallery: number

  @ApiProperty({ example: 'example.jpg', description: 'name and extension file name' })
  @Column({ type: DataType.STRING, allowNull: true, field: 'name' })
  name: string | null

  @ApiProperty({ example: 'true', description: 'delete file or not' })
  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'status' })
  status: boolean | null
}
