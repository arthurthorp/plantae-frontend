import ActivitiesList from '@/components/Activities/List'
import HeaderActivities from '@/components/Header/Activities'
import { cookies } from 'next/headers'

async function getActivities() {
  const cookiesStore = cookies()
  const token = cookiesStore.get('plantae.token')?.value ?? ''

  const res = await fetch('http://0.0.0.0/api/activities', {
    headers: { Authorization: `Bearer ${token}` },
  })

  const response = await res.json()

  if (!response.objects) return

  return response.objects
}

export default async function Activities() {
  const activities = await getActivities()

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderActivities
        text="Atividades"
        linkBackButton="/myaccount"
        showAddButton
      />

      <ActivitiesList activities={activities ?? []} />
    </div>
  )
}
