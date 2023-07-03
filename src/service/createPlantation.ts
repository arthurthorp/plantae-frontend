// import { cookies } from 'next/headers'

// import { ServiceApi } from '@/service/api'

// import { Plantation } from '@/model/Plantation'

// import { CreatePlantationData } from '@/schemas/createPlantation'

// export async function serviceCreatePlantation(data: CreatePlantationData) {
//   try {
//     const cookieStore = cookies()
//     const token = cookieStore.get('plantae.token')?.value ?? ''

//     const api = new ServiceApi(token)
//     const instance = api.getInstance()

//     const url = '/plantations'

//     const response = await instance.post<{ object: Plantation }>(url, data)

//     return response.data.object
//   } catch (error) {
//     console.log(error)
//   }
// }
