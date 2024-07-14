import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { HttpStatus } from '@nestjs/common'

import { AppModule } from '../app.module'

const END_POINT_AUTH = ''
const LOGIN_PATH = '/login'

describe('POST ' + END_POINT_AUTH + LOGIN_PATH, () => {
  let app

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  // it(`should return ${HttpStatus.CREATED} and userOutputDto`, async () => {
  it(`should return ${HttpStatus.OK} and userOutputDto`, async () => {
    const userInputDto = { email: 'admin@gmail.com', password: '12345' }

    try {
      const response = await request(app.getHttpServer())
        .post(END_POINT_AUTH + LOGIN_PATH)
        .send(userInputDto)
        .expect(HttpStatus.OK)

      const userOutputDto = response.body
      // expect(userOutputDto.token).toBeDefined();
      expect(userOutputDto.statusCode).toBe(HttpStatus.OK)
    } catch (error) {
      console.error('The test failed unexpectedly:', error)
      throw error
    }
  }, 3000)
})
