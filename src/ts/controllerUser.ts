import http from 'http'

import * as modelUser from './modelUserInMemory'
import * as utils from './utils'
import { parsePost } from './parsePost'


export const getAllUsers = async(req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const allUsers = await modelUser.findAll()
    utils.sendJSON(200, allUsers, res)
  } catch (err) {
    utils.sendJSON(500, { message: "Server error, couldn't get all users." }, res)
  }
}

export async function createUser(req: http.IncomingMessage, res: http.ServerResponse) {
  try{
    const content = await parsePost(req, res)
    const { username, age, hobbies } = content

    if (!username || !age || !hobbies)
      return utils.sendJSON(400, { message: 'not all fields are specified' }, res)

    const newUser = await modelUser.createUnique({ id: '', username, age, hobbies })
    utils.sendJSON(201, newUser, res)
  } catch(err) {
    utils.sendJSON(500, 'Internal server error', res)
  }
}

export async function getUserById(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  const user = await modelUser.findById(id)
  if (!user) return utils.sendJSON(404, { message: "user with such id doesn't exist" }, res)

  utils.sendJSON(200, user, res)
}

export async function deleteUserById(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  const user = await modelUser.findById(id)
  if (!user) return utils.sendJSON(404, { message: "user with such id doesn't exist" }, res)

  await modelUser.deleteById(id)
  utils.sendJSON(204, { message: `user ${id} has been removed` }, res)
}

export async function updateUserById(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  try {
    const user = await modelUser.findById(id)
    if (!user) return utils.sendJSON(404, { message: "user with such id doesn't exist" }, res)

    const { username, age, hobbies } = await parsePost(req, res)
    const newFields = {
      id: '',
      username: username ?? user.username,
      age: age ?? user.age,
      hobbies: hobbies ?? user.hobbies,
    }

    const updatedUser = await modelUser.updateById(id, newFields)
    utils.sendJSON(200, updatedUser, res)
  } catch(err) {
    utils.sendJSON(500, 'Internal server error', res)
  }
}