import UpdatePlantationForm from '@/components/Form/UpdatePlantation'
import { Plantation } from '@/model/Plantation'

interface InformationsPlantationProps {
  plantation: Plantation
}

export default async function InformationsPlantation(
  props: InformationsPlantationProps,
) {
  return (
    <UpdatePlantationForm
      plantation={JSON.parse(JSON.stringify(props.plantation))}
    />
  )
}
