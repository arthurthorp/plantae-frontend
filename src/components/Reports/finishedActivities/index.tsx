import { Plantation } from '@/model/Plantation'

import FinishedActivitiesContent from './Content'

interface FinishedActivitiesReportProps {
  plantations: Plantation[]
}

export default async function FinishedActivitiesReport(
  props: FinishedActivitiesReportProps,
) {
  return (
    <div className="flex w-full flex-col gap-6">
      <FinishedActivitiesContent plantations={props.plantations} />
    </div>
  )
}
