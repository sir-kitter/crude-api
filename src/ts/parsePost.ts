import * as http from 'http'

import { IUser } from './IUser'
import * as utils from './utils'

export const parsePost = async(request: http.IncomingMessage, response: http.ServerResponse): Promise<IUser> =>
  new Promise((res, rej) => {
    try {
      let content = ''

      request.setEncoding('utf8')
        .on('data', part => content += part)
        .on('end', () => {
          try { res(JSON.parse(content)) }
          catch (err) {
            utils.sendJSON(500, { message: 'Server side error while parsing request.' }, response)
            rej(err)
          }
        })
    } catch (err) {
      utils.sendJSON(500, { message: 'Server side error.' }, response)
      rej(err)
    }
  })
