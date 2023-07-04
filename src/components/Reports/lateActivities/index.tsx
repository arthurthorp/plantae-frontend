import { Plantation } from '@/model/Plantation'

import LateActivitiesContent from './Content'

interface LateActivitiesReportProps {
  plantations: Plantation[]
}

export default async function LateActivitiesReport(
  props: LateActivitiesReportProps,
) {
  return (
    <div className="flex w-full flex-col gap-6">
      <LateActivitiesContent plantations={props.plantations} />
    </div>
  )
}
