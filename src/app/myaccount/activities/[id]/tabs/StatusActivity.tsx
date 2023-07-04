import moment from 'moment'
import Image from 'next/image'

import { Finished } from '@/components/Finished'
import { History } from '@/components/History'

import { Activity } from '@/model/Activity'

interface StatusActivityProps {
  activity: Activity
}

export default async function StatusActivity(props: StatusActivityProps) {
  if (!props.activity.id) return

  function formatStatus() {
    switch (props.activity.status) {
      case 'PENDING':
        return 'Pendente'
      case 'FORBIDDEN':
        return 'Impedida'
      case 'FINISHED':
        return 'Concluída'
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-base font-normal leading-none text-gray-03">
          Status
        </span>
        <span
          data-status={props.activity.status}
          className="text-3xl font-bold leading-none data-[status=FINISHED]:text-green data-[status=FORBIDDEN]:text-red data-[status=PENDING]:text-blue"
        >
          {formatStatus()}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <span className="text-base font-medium leading-none text-brown">
          Histórico de execução
        </span>

        <div
          data-finished={props.activity.status === 'FINISHED'}
          className="block data-[finished=true]:hidden"
        >
          <History activity={JSON.parse(JSON.stringify(props.activity))} />
        </div>

        {props.activity.histories &&
          props.activity.histories.map((history: any) => (
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
        data-finished={props.activity.status === 'FINISHED'}
        className="fixed bottom-0 left-0 flex w-full gap-4 p-6 data-[finished=true]:hidden"
      >
        <History
          activity={JSON.parse(JSON.stringify(props.activity))}
          isImpediment
        />
        <Finished activity={JSON.parse(JSON.stringify(props.activity))} />
      </div>
    </div>
  )
}
