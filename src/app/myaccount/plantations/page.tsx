import HeaderPlantations from '@/components/Header/Plantations'
import PlantationList from '@/components/Plantation/List'
import { cookies } from 'next/headers'

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

export default async function Plantations() {
  const plantations = await getPlantations()

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderPlantations text="Plantações" showAddButton />

      <PlantationList plantations={plantations ?? []} />
    </div>
  )
}
