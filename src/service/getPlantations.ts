// import { cookies } from 'next/headers'

// import { ServiceApi } from './api'

// import { Plantation } from '@/model/Plantation'

// export async function serviceGetPlantations() {
//   try {
//     const cookieStore = cookies()
//     const token = cookieStore.get('plantae.token')?.value ?? ''

//     const api = new ServiceApi(token)
//     const instance = api.getInstance()

//     const url = '/plantations'

//     const response = await instance.get<{ objects: Plantation[] }>(url)

//     return response.data.objects
//   } catch (error) {
//     console.log(error)
//   }
// }
