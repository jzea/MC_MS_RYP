import { IsString, IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateMailDto {
  @ApiProperty({
    example: 'destinatario@example.com',
    description: 'Recipient email address',
  })
  @IsNotEmpty()
  @IsEmail()
  to: string

  @ApiProperty({
    example: 'Subject of the email',
    description: 'Subject of the email',
  })
  @IsNotEmpty()
  @IsString()
  subject: string

  @ApiProperty({
    example: 'Body of the email',
    description: 'Body of the email',
  })
  @IsNotEmpty()
  @IsString()
  text: string
}
