import NewPlantationForm from '@/components/Form/NewPlantation'
import HeaderPlantations from '@/components/Header/Plantations'

export default async function NewPlantation() {
  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderPlantations text="Nova plantação" showBackButton />

      <NewPlantationForm />
    </div>
  )
}
