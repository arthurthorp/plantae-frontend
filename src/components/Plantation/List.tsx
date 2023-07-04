import { Plantation } from '@/model/Plantation'

import PlantationItem from './Item'

interface PlantationListProps {
  plantations: Plantation[]
}

export default function PlantationList(props: PlantationListProps) {
  return (
    <div>
      {props.plantations.map((plantation) => (
        <PlantationItem
          key={plantation.id}
          id={plantation.id}
          name={plantation.name}
          size={parseFloat(plantation.plantationSize)}
          date={new Date(plantation.plantingDate)}
        />
      ))}
    </div>
  )
}
