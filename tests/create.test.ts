import * as http from 'http'
import req from 'supertest'

import { server } from "../src/ts/index"


export const stop = async (server: http.Server) => new Promise<void>((res) => server.close(() => res()))

describe('case create', () => {
  afterAll(async () => await stop(server))

  it('create user', async () => {
    const res = await req(server).post('/api/users').send('{ "username": "asdf", "age": "5", "hobbies": ["mumbling"] }')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(response => JSON.parse(response.text).id.length > 0)
      .expect(response => JSON.parse(response.text).username == 'asdf')
      .expect(response => JSON.parse(response.text).age == '5')
      .expect(response => JSON.parse(response.text).username == 'asdf')
      .expect(response => JSON.stringify(JSON.parse(response.text).hobbies) == JSON.stringify(['mumbling']))
  })
})
