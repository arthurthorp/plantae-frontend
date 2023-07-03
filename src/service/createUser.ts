// import { ServiceApi } from '@/service/api'

// import { CreateUserData } from '@/schemas/createUser'

// export async function serviceCreateUser(data: CreateUserData) {
//   try {
//     const api = new ServiceApi()
//     const instance = api.getInstance()

//     const url = '/auth/register'

//     const response = await instance.post<{ token: string }>(url, data)

//     return response.data.token
//   } catch (error) {
//     console.log(error)
//   }
// }
