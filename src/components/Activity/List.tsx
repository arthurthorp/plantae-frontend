import ActivityItem from './Item'

interface ActivityListProps {
  isItemsShort?: boolean
}

export default function ActivityList(props: ActivityListProps) {
  return (
    <div>
      <ActivityItem
        type="Irrigação"
        description="Colher toda a plantação de café, plantação essa que fica localizada perto do riacho"
        assigned="Matheus"
        date={new Date()}
        isShort={props.isItemsShort}
      />
      <ActivityItem
        type="Irrigação"
        description="Colher toda a plantação de café, plantação essa que fica localizada perto do riacho"
        assigned="Matheus"
        date={new Date()}
        isShort={props.isItemsShort}
      />
      <ActivityItem
        type="Irrigação"
        description="Colher toda a plantação de café, plantação essa que fica localizada perto do riacho"
        assigned="Matheus"
        date={new Date()}
        isShort={props.isItemsShort}
      />
      <ActivityItem
        type="Irrigação"
        description="Colher toda a plantação de café, plantação essa que fica localizada perto do riacho"
        assigned="Matheus"
        date={new Date()}
        isShort={props.isItemsShort}
      />
    </div>
  )
}
