import ActivitiesList from '@/components/Activities/List'
import HeaderActivities from '@/components/Header/Activities'
import { ActivityService } from '@/service/activity/ActivityServerService'

async function getActivities() {
  const activityService = new ActivityService()
  const activities = await activityService.listActivities()
  return activities
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
