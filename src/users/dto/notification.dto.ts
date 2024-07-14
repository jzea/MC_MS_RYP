import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class NotificationDto {
  @ApiProperty({ example: 'Title', description: 'Title of the notification' })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  title?: string

  @ApiProperty({ example: 'Description', description: 'Description of the notification' })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  description?: string

  @ApiProperty({ example: 'Action', description: 'Action associated with the notification' })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  action?: string

  @ApiProperty({
    example: 'd5m6RbXJQEeNPEtgaV95rJ:APA91bH-6WbLkripFcQrGsvYNn4eu2dE-FJ6J3jbxy6cxfIsJXiceo8t54XD9zyqnrqScN-9mDxwJELRZcXykNP8BnYaaOksGMoB_tnRfFwPeOniz4iYaY5gfFRruE5PWU2VXR9rybUz',
    description: 'Token notification',
  })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  token?: string

  sender_iduser?: number

  receiver_iduser?: number
}
