// import { ServiceApi } from '@/service/api'

// import { Plantation } from '@/model/Plantation'

// interface GetPlantationProps {
//   id: string
// }

// export async function serviceGetPlantation(props: GetPlantationProps) {
//   try {
//     const api = new ServiceApi()
//     const instance = api.getInstance()

//     const url = `/plantations/${props.id}`

//     const response = await instance.get<{ object: Plantation }>(url)

//     return response.data.object
//   } catch (error) {
//     console.log(error)
//   }
// }
