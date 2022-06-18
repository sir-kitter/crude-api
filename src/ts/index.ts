import * as path from 'path'
import * as http from 'http'

import * as dotenv from 'dotenv'

import * as utils from './utils'
import * as modelUser from './modelUserInMemory'
import * as controlUser from './controllerUser'


dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const notFound = (info: string, response: http.ServerResponse) => {
    utils.sendJSON(404, { message: `${info} was not found.`}, response)
}

export const server = http.createServer((request, response) => {
  try {
    if (!request.url) return notFound(request.url ?? '', response)

    if (request.url == '/api/users') {
      if (request.method == 'GET') return controlUser.getAllUsers(request, response)
      if (request.method == 'POST') return controlUser.createUser(request, response)
    }

    if (request.url.startsWith('/api/users/')) {
      const uuid = request.url.split('/').slice(3).join('/')
      if(!utils.isUuid(uuid)) return utils.sendJSON(400, `${uuid} is not a valid uuid`, response)
  
      if (request.method == 'DELETE') return controlUser.deleteUserById(request, response, uuid)
      if (request.method == 'PUT') return controlUser.updateUserById(request, response, uuid)
      if (request.method == 'GET') return controlUser.getUserById(request, response, uuid)
    }
    return notFound(request.url ?? '', response)
  } catch(err) {
    utils.sendJSON(500, { message: 'Server error' }, response)
  }
})
.on('error', (err) => {
  console.log(`unhandled exception, error: ${JSON.stringify(err)}`)
})
.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 500 internal server error\r\n\r\n');
})

const port = process.env.httpPort ?? 4444
server.listen(port).on('listening', () => console.log(`listening on HTTP port ${port}`))