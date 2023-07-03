import NewActivityForm from '@/components/Form/NewActivity'
import HeaderActivities from '@/components/Header/Activities'
import { cookies } from 'next/headers'

async function getAgriculturalInput() {
  const res = await fetch('http://0.0.0.0/api/agricultural-inputs')

  const response = await res.json()

  if (!response.objects) return

  return response.objects
}

async function getPlantations() {
  const cookiesStore = cookies()
  const token = cookiesStore.get('plantae.token')?.value ?? ''

  const res = await fetch('http://0.0.0.0/api/plantations', {
    headers: { Authorization: `Bearer ${token}` },
  })

  const response = await res.json()

  if (!response.objects) return

  return response.objects
}

async function getUserAuthenticated() {
  const cookiesStore = cookies()
  const token = cookiesStore.get('plantae.token')?.value ?? ''

  const res = await fetch('http://0.0.0.0/api/user', {
    headers: { Authorization: `Bearer ${token}` },
  })

  const response = await res.json()

  if (!response.object) return

  return response.object
}

export default async function NewActivity() {
  const agriculturalInputs = await getAgriculturalInput()
  const plantations = await getPlantations()
  const user = await getUserAuthenticated()

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderActivities
        text="Nova atividade"
        linkBackButton="/myaccount/activities"
      />

      <NewActivityForm
        agriculturalInputs={agriculturalInputs}
        plantations={plantations}
        userAuth={user}
      />
    </div>
  )
}
