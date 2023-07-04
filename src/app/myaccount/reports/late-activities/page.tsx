import HeaderActivities from '@/components/Header/Activities'
import LateActivitiesReport from '@/components/Reports/lateActivities'

import { Plantation } from '@/model/Plantation'

import { PlantationService } from '@/service/plantation/PlantationServerService'

async function listPlantations(): Promise<Plantation[] | undefined> {
  const plantationService = new PlantationService()
  const plantations = await plantationService.listPlantations()
  return plantations
}

export default async function ReportsLateActivities() {
  const plantations = await listPlantations()

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderActivities
        text="Atividades atrasadas"
        linkBackButton="/myaccount/reports"
      />

      <LateActivitiesReport
        plantations={JSON.parse(JSON.stringify(plantations ?? []))}
      />
    </div>
  )
}
