import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsBoolean } from 'class-validator'

export class ResponseUserDto {
  @ApiProperty({ example: true, description: 'Indicates the state of the response' })
  @IsBoolean({ message: 'Should be a boolean' })
  readonly success: boolean

  @ApiProperty({ example: 'Some message', description: 'Descriptive message related to the response' })
  @IsString({ message: 'Should be a string' })
  readonly message: string
}
