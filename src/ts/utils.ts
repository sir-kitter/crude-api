import * as uuid from 'uuid'

export const isUuid = (id: string) => uuid.version(id) == 4 && uuid.validate(id)


import * as http from 'http'

export const sendJSON = (status: number, message: any, response: http.ServerResponse) => {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(message))
}
