import ActivitiesList from '@/components/Activities/List'
import HeaderDashboard from '@/components/Header/Dashboard'
import { ActivityService } from '@/service/activity/ActivityServerService'
import { cookies } from 'next/headers'

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

async function getActivities() {
  const activityService = new ActivityService()
  const activities = await activityService.listActivitiesDashboard()
  return activities
}

export default async function Dashboard() {
  const user = await getUserAuthenticated()
  const activities = await getActivities()

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderDashboard />

      <p className="text-base font-normal leading-normal text-gray-03">
        <span className="font-semibold text-orange">Olá, {user.name}!</span>{' '}
        Bom, aqui vão algumas informações para você
      </p>

      <iframe
        src="https://api.wo-cloud.com/content/widget/?geoObjectKey=12100465&language=pt&region=BR&timeFormat=HH:mm&windUnit=kmh&systemOfMeasurement=metric&temperatureUnit=celsius"
        name="CW2"
        scrolling="no"
        width="290"
        height="318"
        frameBorder="0"
        className="h-72 w-full overflow-hidden rounded"
      />

      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold leading-none text-brown">
          Próximas atividades
        </span>

        <ActivitiesList isItemsShort activities={activities} />
      </div>
    </div>
  )
}
