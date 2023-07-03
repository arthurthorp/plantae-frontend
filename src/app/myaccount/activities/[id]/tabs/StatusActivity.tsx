import { Finished } from '@/components/Finished'
import { History } from '@/components/History'
import axios from 'axios'
import moment from 'moment'
import { cookies } from 'next/headers'
import Image from 'next/image'

async function getActivity(id: string) {
  const cookiesStore = cookies()
  const token = cookiesStore.get('plantae.token')?.value ?? ''

  const response = await axios.get(`http://0.0.0.0/api/activities/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.data.object) return

  return response.data.object
}

export default async function StatusActivity(props: { activityId: string }) {
  const activity = await getActivity(props.activityId)

  if (!activity) return

  return (
    <div className="flex flex-col items-stretch gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-base font-normal leading-none text-gray-03">
          Status
        </span>
        <span
          className={`text-3xl font-bold leading-none ${
            activity.status === 'PENDING' && 'text-blue'
          } ${activity.status === 'FORBIDDEN' && 'text-red'} ${
            activity.status === 'FINISHED' && 'text-green'
          }`}
        >
          {activity.status === 'PENDING' && 'Pendente'}
          {activity.status === 'FORBIDDEN' && 'Impedida'}
          {activity.status === 'FINISHED' && 'Concluída'}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 pb-[7rem]">
        <span className="text-base font-medium leading-none text-brown">
          Histórico de execução
        </span>
        <div
          data-finished={activity.status === 'FINISHED'}
          className="block data-[finished=true]:hidden"
        >
          <History activityId={props.activityId} />
        </div>
        {activity.histories.map((history: any) => (
          <div
            key={history.id}
            className="flex items-stretch overflow-hidden rounded bg-gray-01"
          >
            <Image
              src={history.imagePath ?? '/image/default.png'}
              alt={history.description}
              width={96}
              height={0}
              style={{ objectFit: 'cover' }}
            />
            <div className="flex flex-col gap-1 p-4">
              <p className="text-base font-normal leading-normal text-gray-04">
                {history.description}
              </p>
              <span className="text-xs font-normal leading-normal text-gray-03">
                {moment(history.createdAt).format('DD MMM, YYYY')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        data-finished={activity.status === 'FINISHED'}
        className="fixed bottom-0 left-0 flex w-full gap-4 p-6 data-[finished=true]:hidden"
      >
        <History activityId={props.activityId} isImpediment />
        <Finished activityId={props.activityId} />
      </div>
    </div>
  )
}
