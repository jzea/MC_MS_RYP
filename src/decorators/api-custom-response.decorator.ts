import { ApiResponse } from '@nestjs/swagger'

export const ApiCustomResponse = (statusCode: number, message: string, dataRef: string, error: string = '', isArray: boolean = false) =>
  ApiResponse({
    status: statusCode,
    description: message,
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: statusCode },
        data: isArray
          ? {
              type: 'array',
              items: { $ref: `#/components/schemas/${dataRef}` },
            }
          : { $ref: `#/components/schemas/${dataRef}` },
        message: { type: 'string', example: message },
        error: { type: 'string', example: error },
      },
    },
  })
