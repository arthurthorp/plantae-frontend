import { Activity } from '@/model/Activity'

import ActivitiesItem from './Item'

interface ActivitiesListProps {
  activities: Activity[]
}

export default function ActivitiesList(props: ActivitiesListProps) {
  return (
    <div>
      {props.activities.map((activity) => {
        console.log(activity)

        return (
          <ActivitiesItem
            key={activity.id}
            id={activity.id}
            type={activity.type}
            status={activity.status}
            description={activity.description}
            user={activity.user?.name ?? '-'}
            date={new Date(activity.estimateDate)}
          />
        )
      })}
    </div>
  )
}
