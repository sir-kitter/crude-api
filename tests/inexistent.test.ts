import * as http from 'http'
import req from 'supertest'

import { server } from "../src/ts/index"


export const stop = async (server: http.Server) => new Promise<void>((res) => server.close(() => res()))

describe('case inexistent', () => {
  afterAll(async () => await stop(server))

  it('Errors on the server side that occur during the processing of a request ==> 500', async () => {
    const res = await req(server).post('/api/users').send('trash')
    expect(res.statusCode).toBe(500) // internal server error
  })
  it('Requests to non-existing endpoints ==> 404', async () => {
    const res = await req(server).get('/trash')
    expect(res.statusCode).toBe(404) // not found
  })
})
