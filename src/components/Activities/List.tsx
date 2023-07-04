import { Activity } from '@/model/Activity'

import ActivitiesItem from './Item'

interface ActivitiesListProps {
  activities: Activity[]
  isItemsShort?: boolean
}

export default function ActivitiesList(props: ActivitiesListProps) {
  return (
    <div>
      {props.activities.map((activity) => (
        <ActivitiesItem
          key={activity.id}
          id={activity.id as number}
          type={activity.type}
          status={activity.status}
          description={activity.description}
          user={activity.user?.name ?? '-'}
          date={new Date(activity.estimateDate)}
          isItemsShort={props.isItemsShort}
        />
      ))}
    </div>
  )
}
