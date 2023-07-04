import HeaderActivities from '@/components/Header/Activities'
import AgriculturalInputReport from '@/components/Reports/agriculturalInput'

import { Plantation } from '@/model/Plantation'

import { PlantationService } from '@/service/plantation/PlantationServerService'

async function listPlantations(): Promise<Plantation[] | undefined> {
  const plantationService = new PlantationService()
  const plantations = await plantationService.listPlantations()
  return plantations
}

export default async function ReportsAgriculturalInputs() {
  const plantations = await listPlantations()

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderActivities
        text="Insumos utilizados"
        linkBackButton="/myaccount/reports"
      />

      <AgriculturalInputReport
        plantations={JSON.parse(JSON.stringify(plantations ?? []))}
      />
    </div>
  )
}
