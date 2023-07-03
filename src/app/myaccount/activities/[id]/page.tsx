import InformationsActivity from './tabs/InformationsActivity'
import StatusActivity from './tabs/StatusActivity'

import HeaderActivities from '@/components/Header/Activities'
import TabsList from '@/components/Tabs'
import { cookies } from 'next/headers'

interface ActivityProps {
  params: { id: string }
  searchParams: { tab: string }
}

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

async function getActivity(id: string) {
  const cookiesStore = cookies()
  const token = cookiesStore.get('plantae.token')?.value ?? ''

  const res = await fetch(`http://0.0.0.0/api/activities/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const response = await res.json()

  if (!response.object) return

  return response.object
}

export default async function Activity(props: ActivityProps) {
  const activity = await getActivity(props.params.id)
  const agriculturalInput = await getAgriculturalInput()
  const user = await getUserAuthenticated()
  const plantations = await getPlantations()

  if (!activity) return

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderActivities
        text="Alterar atividade"
        linkBackButton="/myaccount/activities"
      />

      <div className="flex flex-col gap-8">
        <TabsList
          baseURL={`/myaccount/activities/${props.params.id}`}
          tabs={[
            {
              label: 'Status',
              path: 'status',
              selected:
                !props.searchParams.tab || props.searchParams.tab === 'status',
            },
            {
              label: 'Informações',
              path: 'informations',
              selected: props.searchParams.tab === 'informations',
            },
          ]}
        />

        {(!props.searchParams.tab || props.searchParams.tab === 'status') && (
          <StatusActivity activityId={props.params.id} />
        )}

        {props.searchParams.tab === 'informations' && (
          <InformationsActivity
            activityId={props.params.id}
            agriculturalInputs={agriculturalInput}
            plantations={plantations}
            userAuth={user}
          />
        )}
      </div>
    </div>
  )
}
