'use client'

import { ArrowsOutCardinal, CalendarBlank, Plant } from '@phosphor-icons/react'
import moment from 'moment'
import Link from 'next/link'

interface PlantationItemProps {
  id: number
  name: string
  size: number
  date: Date
}

export default function PlantationItem(props: PlantationItemProps) {
  return (
    <Link
      href={`/myaccount/plantations/${props.id}`}
      className="flex flex-col gap-4 border-b border-gray-02 py-4"
    >
      <div className="flex w-full items-center justify-start gap-2 text-orange">
        <Plant weight="bold" size="1rem" />
        <span className="flex-1 text-base font-semibold capitalize leading-none">
          {props.name}
        </span>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between gap-2 text-gray-03">
          <ArrowsOutCardinal weight="bold" size="1rem" />
          <span className="text-base font-normal leading-none">
            {props.size} Ha
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-gray-03">
          <CalendarBlank weight="bold" size="1rem" />
          <span className="text-base font-normal leading-none">
            {moment(props.date).format('DD MMM YYYY')}
          </span>
        </div>
      </div>
    </Link>
  )
}
