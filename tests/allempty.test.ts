import * as http from 'http'
import req from 'supertest'

import { server } from "../src/ts/index"


export const stop = async (server: http.Server) => new Promise<void>((res) => server.close(() => res()))

describe('case empty list', () => {
  afterAll(async () => await stop(server))

  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const res = await req(server).get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(response => JSON.parse(response.text).length == 0)
      .expect(response => Array.isArray(JSON.parse(response.text)))
  })
})
