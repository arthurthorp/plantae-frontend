import { Plantation } from '@/model/Plantation'

import AgriculturalInputContent from './Content'

interface AgriculturalInputReportProps {
  plantations: Plantation[]
}

export default async function AgriculturalInputReport(
  props: AgriculturalInputReportProps,
) {
  return (
    <div className="flex w-full flex-col gap-6">
      <AgriculturalInputContent plantations={props.plantations} />
    </div>
  )
}
