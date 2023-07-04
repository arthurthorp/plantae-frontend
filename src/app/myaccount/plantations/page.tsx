import HeaderPlantations from '@/components/Header/Plantations'
import PlantationList from '@/components/Plantation/List'
import { PlantationService } from '@/service/plantation/PlantationServerService'

async function getPlantations() {
  const plantationService = new PlantationService()
  const plantations = await plantationService.listPlantations()
  return plantations
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
