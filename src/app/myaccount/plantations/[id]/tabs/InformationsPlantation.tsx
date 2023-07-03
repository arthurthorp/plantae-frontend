import UpdatePlantationForm from '@/components/Form/UpdatePlantation'
import axios from 'axios'
import { cookies } from 'next/headers'

async function getPlantation(id: string) {
  const cookiesStore = cookies()
  const token = cookiesStore.get('plantae.token')?.value ?? ''

  const response = await axios.get(`http://0.0.0.0/api/plantations/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.data.object) return

  return response.data.object
}

function formatDate(date: Date) {
  let day = (date.getDate() + 1).toString()
  if (day.length === 1) day = '0' + day

  let month = (date.getMonth() + 1).toString()
  if (month.length === 1) month = '0' + month

  let year = date.getFullYear().toString()
  if (year.length === 1) year = '0' + year

  return `${year}-${month}-${day}`
}

export default async function InformationsPlantation(props: {
  plantationId: string
}) {
  const plantation = await getPlantation(props.plantationId)

  if (!plantation) return

  return (
    <UpdatePlantationForm
      plantationId={props.plantationId}
      data={{
        name: plantation.name,
        description: plantation.description,
        cultivation: plantation.cultivation,
        plantingDate: formatDate(new Date(plantation.plantingDate)),
        estimateHarvestDate: formatDate(
          new Date(plantation.estimateHarvestDate),
        ),
        plantationSize: plantation.plantationSize,
      }}
    />
  )
}
