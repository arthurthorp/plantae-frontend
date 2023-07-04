import axios from 'axios'
import { parseCookies } from 'nookies'

import { User } from '@/model/User'

export interface UserResponse {
  id: number
  name: string
  email: string
  emailVerifiedAt: string | null
  phone: string
  isOwner: boolean
  birthDate: string
  createdAt: string
  updatedAt: string
}

export class UserService {
  private options: object

  constructor() {
    const { 'plantae.token': token } = parseCookies()

    this.options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
      cache: 'no-store',
    }
  }

  async getUser(userId: number): Promise<User> {
    const res = await fetch(`http://0.0.0.0/api/user/${userId}`, this.options)

    if (!res.ok) throw new Error('Error to fetch data from server')

    const user: { object: UserResponse } = await res.json()

    const newUser = new User({
      id: user.object.id,
      name: user.object.name,
      email: user.object.email,
      emailVerifiedAt: user.object.emailVerifiedAt ?? undefined,
      phone: user.object.phone,
      isOwner: user.object.isOwner,
      birthDate: user.object.birthDate,
      createdAt: new Date(user.object.createdAt),
      updatedAt: new Date(user.object.updatedAt),
    })

    return newUser
  }

  async getUserAuthenticated(): Promise<User> {
    const res = await fetch(`http://0.0.0.0/api/user`, this.options)

    if (!res.ok) throw new Error('Error to fetch data from server')

    const user: { object: UserResponse } = await res.json()

    const newUser = new User({
      id: user.object.id,
      name: user.object.name,
      email: user.object.email,
      emailVerifiedAt: user.object.emailVerifiedAt ?? undefined,
      phone: user.object.phone,
      isOwner: user.object.isOwner,
      birthDate: user.object.birthDate,
      createdAt: new Date(user.object.createdAt),
      updatedAt: new Date(user.object.updatedAt),
    })

    return newUser
  }

  async createUser(user: User, plantationId: string = '') {
    let url = 'http://0.0.0.0/api/auth/register'

    if (plantationId !== '') url += `?plantation=${plantationId}`

    const res = await axios.post(url, user, this.options)

    if (res.statusText !== 'OK')
      throw new Error('Error to fetch data from server')

    return true
  }
}
