// import { ServiceApi } from '@/service/api'

// import { User } from '@/model/User'

// interface GetAssociatesProps {
//   plantationId: string
// }

// export async function serviceGetAssociates(props: GetAssociatesProps) {
//   try {
//     const api = new ServiceApi()
//     const instance = api.getInstance()

//     const url = `/plantations/${props.plantationId}/associates`

//     const response = await instance.get<{ object: User[] }>(url)

//     return response.data.object
//   } catch (error) {
//     console.log(error)
//   }
// }
