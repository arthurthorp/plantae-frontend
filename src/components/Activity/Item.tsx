'use client'

import { CalendarBlank, Drop, User } from '@phosphor-icons/react'
import moment from 'moment'

interface ActivityItemProps {
  type: string
  description: string
  assigned: string
  date: Date
  isShort?: boolean
}

export default function ActivityItem(props: ActivityItemProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-02 py-4">
      <div className="flex w-full items-center justify-start gap-2 text-orange">
        <Drop weight="bold" size="1rem" />
        <span className="flex-1 text-base font-semibold leading-none">
          {props.type}
        </span>
      </div>

      <p
        data-hidden={props.isShort}
        className="w-full text-base font-normal leading-normal data-[hidden]:hidden"
      >
        {props.description}
      </p>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between gap-2 text-gray-03">
          <User weight="bold" size="1rem" />
          <span className="text-base font-normal leading-none">
            {props.assigned}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-gray-03">
          <CalendarBlank weight="bold" size="1rem" />
          <span className="text-base font-normal leading-none">
            {moment(props.date).format('DD MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
