import { PlantationService } from '@/service/plantation/PlantationServerService'

import HeaderPlantations from '@/components/Header/Plantations'
import TabsList from '@/components/Tabs'
import ActivitiesPlantation from './tabs/ActivitiesPlantation'
import AssociatesPlantation from './tabs/AssociatesPlantation'
import InformationsPlantation from './tabs/InformationsPlantation'

interface PlantationProps {
  params: { id: string }
  searchParams: { tab: string }
}

async function getPlantation(id: number) {
  const plantationService = new PlantationService()
  const plantation = await plantationService.getPlantation(id)
  return plantation
}

export default async function Plantation(props: PlantationProps) {
  const plantation = await getPlantation(parseInt(props.params.id))

  if (!plantation) return

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderPlantations text={plantation.name} showBackButton />

      <div className="flex flex-col gap-8">
        <TabsList
          baseURL={`/myaccount/plantations/${props.params.id}`}
          tabs={[
            {
              label: 'Atividades',
              path: 'activities',
              selected:
                !props.searchParams.tab ||
                props.searchParams.tab === 'activities',
            },
            {
              label: 'Associados',
              path: 'associates',
              selected: props.searchParams.tab === 'associates',
            },
            {
              label: 'Informações',
              path: 'informations',
              selected: props.searchParams.tab === 'informations',
            },
          ]}
        />

        {(!props.searchParams.tab ||
          props.searchParams.tab === 'activities') && (
          <ActivitiesPlantation plantation={plantation} />
        )}

        {props.searchParams.tab === 'associates' && (
          <AssociatesPlantation plantation={plantation} />
        )}

        {props.searchParams.tab === 'informations' && (
          <InformationsPlantation plantation={plantation} />
        )}
      </div>
    </div>
  )
}
