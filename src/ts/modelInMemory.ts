import * as uuid from 'uuid'

import { IUser } from 'IUser'


const tableUsers: IUser[] = []

export async function createUnique(user: IUser): Promise<IUser> {
  return new Promise(res => {
    const uniqueUser = { ...user, id: uuid.v4() }
    tableUsers.push(uniqueUser)
    res(uniqueUser)
  })
}

export async function findAll(): Promise<IUser[]> { return new Promise(res => res(tableUsers)) }

export async function findById(id: string): Promise<null | IUser> {
  return new Promise(res => {
    const user = tableUsers.find(user => id == user.id) ?? null
    res(user)
  })
}

export async function updateById(desiredId: string, newInfo: IUser): Promise<IUser | null> {
  return new Promise((res, rej) => {
    const index = tableUsers.findIndex(user => desiredId == user.id)
    if(index == -1) {
      rej(null)
    } else {
      res(tableUsers[index] = { ...newInfo, id: desiredId })
    }
  })
}

export async function deleteById(userId: string): Promise<boolean> {
  return new Promise((res, rej) => {
    const index = tableUsers.findIndex(user => userId == user.id)
    if(index == -1) {
      rej(false)
    } else {
      tableUsers.splice(index, 1)
      res(true)
    }
  })
}
