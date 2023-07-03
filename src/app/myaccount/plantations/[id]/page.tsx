import HeaderPlantations from '@/components/Header/Plantations'
import TabsList from '@/components/Tabs'
import { cookies } from 'next/headers'
import ActivitiesPlantation from './tabs/ActivitiesPlantation'
import AssociatesPlantation from './tabs/AssociatesPlantation'
import InformationsPlantation from './tabs/InformationsPlantation'

interface PlantationProps {
  params: { id: string }
  searchParams: { tab: string }
}

async function getPlantation(id: string) {
  // const { 'plantae.token': token } = parseCookies()

  const cookiesStore = cookies()
  const token = cookiesStore.get('plantae.token')?.value ?? ''

  const res = await fetch(`http://0.0.0.0/api/plantations/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const response = await res.json()

  if (!response.object) return

  return response.object
}

export default async function Plantation(props: PlantationProps) {
  const plantation = await getPlantation(props.params.id)

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
          <ActivitiesPlantation plantationId={props.params.id} />
        )}

        {props.searchParams.tab === 'associates' && (
          <AssociatesPlantation plantationId={props.params.id} />
        )}

        {props.searchParams.tab === 'informations' && (
          <InformationsPlantation plantationId={props.params.id} />
        )}
      </div>
    </div>
  )
}
