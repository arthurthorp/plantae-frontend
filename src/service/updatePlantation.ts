// import { ServiceApi } from '@/service/api'

// import { Plantation } from '@/model/Plantation'

// export interface UpdatePlantationProps extends Omit<Partial<Plantation>, 'id'> {
//   id: string
// }

// export async function serviceUpdatePlantation(
//   data: UpdatePlantationProps,
// ): Promise<Plantation | undefined> {
//   try {
//     const api = new ServiceApi()
//     const instance = api.getInstance()

//     const url = `/plantations/${data.id}`

//     const response = await instance.put<{ object: Plantation }>(url, data)

//     return response.data.object
//   } catch (error) {
//     console.log(error)
//   }
// }
