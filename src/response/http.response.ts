import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class HttpResponse<T> {
  @ApiProperty({ example: 200, description: 'Código de estado HTTP' })
  statusCode: number

  @ApiProperty({ example: {}, description: 'Datos de la respuesta' })
  data?: T

  @ApiProperty({ example: 'Success', description: 'Mensaje de la respuesta' })
  message: string

  @ApiProperty({ example: 'Error message', description: 'Mensaje de error en caso de fallo' })
  error?: string

  constructor(statusCode: number, message: string, data?: T, error?: string) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
    this.error = error
  }

  static success<T>(data: T, message = 'Success'): HttpResponse<T> {
    return new HttpResponse<T>(HttpStatus.OK, message, data)
  }

  static created<T>(data: T, message = 'Resource Created'): HttpResponse<T> {
    return new HttpResponse<T>(HttpStatus.CREATED, message, data)
  }

  static error<T>(message: string, error = 'Internal Server Error'): HttpResponse<T> {
    return new HttpResponse<T>(HttpStatus.INTERNAL_SERVER_ERROR, message, undefined, error)
  }

  static badRequest<T>(message: string, error?: string): HttpResponse<T> {
    return new HttpResponse<T>(HttpStatus.BAD_REQUEST, message, undefined, error)
  }

  static notFound<T>(message: string, error?: string): HttpResponse<T> {
    return new HttpResponse<T>(HttpStatus.NOT_FOUND, message, undefined, error)
  }
}
