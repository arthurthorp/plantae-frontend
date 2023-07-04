import BoardResume from '@/components/BoardResume'
import { Plantation } from '@/model/Plantation'
import { PlantationService } from '@/service/plantation/PlantationServerService'
import { formatDate } from '@/utils/formatDate'

interface ActivitiesPlantationProps {
  plantation: Plantation
}

async function getResume(plantationId: number) {
  const plantationService = new PlantationService()
  const resume = await plantationService.getResume(plantationId)

  return resume
}

export default async function ActivitiesPlantation(
  props: ActivitiesPlantationProps,
) {
  if (!props.plantation.id) return

  const resume = await getResume(props.plantation.id)

  if (!resume) return

  return (
    <div className="flex flex-col items-stretch gap-8">
      <div className="flex flex-col">
        <BoardResume
          title="Irrigação"
          type="IIRIGATION"
          executionDate={resume.irrigation?.executionDate}
        />

        <BoardResume
          title="Aplicação de insumo"
          type="AGRICULTURAL_INPUT"
          executionDate={resume.agriculturalInput?.executionDate}
        />

        <BoardResume
          title="Poda"
          type="PARING"
          executionDate={resume.paring?.executionDate}
        />
      </div>

      <div className="flex flex-col items-stretch gap-4">
        <h3 className="text-base font-semibold leading-none text-brown">
          Outras atividades
        </h3>

        <div className="flex flex-col items-stretch gap-3">
          {resume.list.map((item) => (
            <div key={item.id} className="flex">
              <span className="w-16 text-base font-medium leading-none text-gray-04">
                {item.executionDate
                  ? formatDate({ date: item.executionDate, format: 'DD MMM' })
                  : '-'}
              </span>
              <span className="flex-1 text-base font-normal leading-none text-gray-04">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
