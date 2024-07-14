import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateFirebaseUidDto {
  @ApiProperty({ example: 'firebase_uid_string', description: 'Firebase UID' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The uid_firebase field cannot be empty' })
  readonly uid_firebase: string

  @ApiProperty({ example: 'facebook', description: 'Authentication method' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The uid_reference field cannot be empty' })
  @IsOptional()
  readonly uid_reference?: string | null

  readonly iduser?: number
}
