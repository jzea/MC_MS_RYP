import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class DeleteFirebaseUidDto {
  @ApiProperty({ example: 'firebase_uid_string', description: 'Firebase UID' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The uid_firebase field cannot be empty' })
  readonly uid_firebase: string
}
