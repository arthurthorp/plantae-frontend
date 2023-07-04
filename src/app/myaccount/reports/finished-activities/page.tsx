import HeaderActivities from '@/components/Header/Activities'
import FinishedActivitiesReport from '@/components/Reports/finishedActivities'

import { Plantation } from '@/model/Plantation'

import { PlantationService } from '@/service/plantation/PlantationServerService'

async function listPlantations(): Promise<Plantation[] | undefined> {
  const plantationService = new PlantationService()
  const plantations = await plantationService.listPlantations()
  return plantations
}

export default async function ReportsFinishedActivities() {
  const plantations = await listPlantations()

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderActivities
        text="Atividades executadas"
        linkBackButton="/myaccount/reports"
      />

      <FinishedActivitiesReport
        plantations={JSON.parse(JSON.stringify(plantations ?? []))}
      />
    </div>
  )
}
