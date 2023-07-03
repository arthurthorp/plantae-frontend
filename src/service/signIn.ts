// import { ServiceApi } from '@/service/api'

// import { SignInData } from '@/schemas/signIn'

// export async function serviceSignIn(data: SignInData) {
//   try {
//     const api = new ServiceApi()
//     const instance = api.getInstance()

//     const url = '/auth/login'

//     const response = await instance.post<{
//       message: string
//       isOwner: boolean
//       token: string
//     }>(url, data)

//     return response.data.token
//   } catch (error) {
//     console.log(error)
//   }
// }
