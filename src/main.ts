import { Language } from './auth/languaje'

export const language = new Language()
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
;(async function start() {
  const PORT = process.env.PORT ?? 5004
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Microservicio Roles y Perfiles')
    .setDescription('Microservicio será utilizado para validaciones de autotenticación y temas de seguridad de usuarios, como los perfiles de cada modulo')
    .setVersion('1.0.0')
    .addTag('NestJS Backend')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  document.servers = [{ url: '/auth' }]
  SwaggerModule.setup('/api/docs', app, document)
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
  })
  await app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
})()
