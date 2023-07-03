import axios from 'axios'
import { cookies } from 'next/headers'

import UpdateActivityForm from '@/components/Form/UpdateActivity'

async function getActivity(id: string) {
  const cookiesStore = cookies()
  const token = cookiesStore.get('plantae.token')?.value ?? ''

  const response = await axios.get(`http://0.0.0.0/api/activities/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.data.object) return

  return response.data.object
}

export default async function InformationsActivity(props: {
  activityId: string
  agriculturalInputs: any[]
  plantations: any[]
  userAuth: any
}) {
  const activity = await getActivity(props.activityId)

  if (!activity) return

  return (
    <UpdateActivityForm
      activityId={props.activityId}
      agriculturalInputs={props.agriculturalInputs}
      plantations={props.plantations}
      userAuth={props.userAuth}
      data={{
        type: activity.type ? activity.type.toString() : '',
        agriculturalInputId: activity.agriculturalInputId
          ? activity.agriculturalInputId.toString()
          : '',
        chargeIn: activity.chargeIn ? activity.chargeIn.toString() : '',
        description: activity.description
          ? activity.description.toString()
          : '',
        estimateDate: activity.estimateDate
          ? activity.estimateDate.toString()
          : '',
        estimateProdutivity: activity.estimateProdutivity
          ? activity.estimateProdutivity.toString()
          : '',
        plantationId: activity.plantationId
          ? activity.plantationId.toString()
          : '',
        price: activity.price ? activity.price.toString() : '',
        quantityUsed: activity.quantityUsed
          ? activity.quantityUsed.toString()
          : '',
        realProdutivity: activity.realProdutivity
          ? activity.realProdutivity.toString()
          : '',
        status: activity.status ? activity.status.toString() : '',
      }}
    />
  )
}
