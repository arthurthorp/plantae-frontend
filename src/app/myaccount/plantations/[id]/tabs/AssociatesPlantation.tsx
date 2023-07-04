import CopyToClipboard from '@/components/CopyToClipboard'
import { Plantation } from '@/model/Plantation'
import { PlantationService } from '@/service/plantation/PlantationServerService'

async function getAssociates(plantationId: number) {
  const plantationService = new PlantationService()
  const associates = await plantationService.getAssociates(plantationId)
  return associates
}

interface AssociatesPlantationProps {
  plantation: Plantation
}

export default async function AssociatesPlantation(
  props: AssociatesPlantationProps,
) {
  if (!props.plantation.id) return

  const associates = await getAssociates(props.plantation.id)

  return (
    <div className="flex w-full flex-col gap-8">
      <CopyToClipboard
        title="Copiar link para associados"
        copy={`http://localhost:3000/register?plantation=${props.plantation.id}`}
      />

      <div className="flex flex-col">
        <h3 className="w-full text-base font-semibold leading-none text-brown">
          Usuários associados
        </h3>
        <div>
          {associates.map((associate: any) => (
            <p
              key={associate.id}
              className="w-full border-b border-gray-02 py-4 text-base font-normal leading-none text-gray-03"
            >
              {associate.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
