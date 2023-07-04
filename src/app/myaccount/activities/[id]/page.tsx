import InformationsActivity from './tabs/InformationsActivity'
import StatusActivity from './tabs/StatusActivity'

import HeaderActivities from '@/components/Header/Activities'
import TabsList from '@/components/Tabs'

import { ActivityService } from '@/service/activity/ActivityServerService'

interface ActivityProps {
  params: { id: string }
  searchParams: { tab: string }
}

async function getActivity(id: number) {
  const activityService = new ActivityService()
  const activities = await activityService.getActivity(id)
  return activities
}

export default async function Activity(props: ActivityProps) {
  const activity = await getActivity(parseInt(props.params.id))

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
          <StatusActivity activity={activity} />
        )}

        {props.searchParams.tab === 'informations' && (
          <InformationsActivity activity={activity} />
        )}
      </div>
    </div>
  )
}
