'use client'

import { ReactElement, useState } from 'react'

import { Plantation } from '@/model/Plantation'

import { Activity } from '@/model/Activity'
import { ReportsService } from '@/service/reports/ReportsClientService'
import { formatDate } from '@/utils/formatDate'
import {
  Bag,
  CalendarBlank,
  Drop,
  Plant,
  Question,
  Scissors,
  User,
} from '@phosphor-icons/react'

interface InputSearchProps {
  plantations: Plantation[]
}

async function buildReportFinishedActivities(plantationId: number) {
  const reportsService = new ReportsService()
  const response = await reportsService.getFinishedActivities(plantationId)
  return response
}

export default function FinishedActivitiesContent(props: InputSearchProps) {
  const [reportResult, setReportResult] = useState<Activity[]>()

  async function handleChange(plantationId: number) {
    const report = await buildReportFinishedActivities(plantationId)
    setReportResult(report)
  }

  function formatActivityType(type: string): string {
    switch (type) {
      case 'AGRICULTURAL_INPUT':
        return 'Aplicação de insumo'
      case 'IRRIGATION':
        return 'Irrigação'
      case 'PARING':
        return 'Poda'
      case 'HARVEST':
        return 'Colheita'
      case 'OTHER':
        return 'Outros'
    }

    return ''
  }

  function formatActivityIcon(type: string): ReactElement {
    switch (type) {
      case 'AGRICULTURAL_INPUT':
        return <Plant weight="bold" size="1rem" />
      case 'IRRIGATION':
        return <Drop weight="bold" size="1rem" />
      case 'PARING':
        return <Scissors weight="bold" size="1rem" />
      case 'HARVEST':
        return <Bag weight="bold" size="1rem" />
      case 'OTHER':
        return <Question weight="bold" size="1rem" />
    }

    return <></>
  }

  return (
    <div className="flex flex-col gap-4">
      <select
        onChange={(e) => handleChange(parseInt(e.target.value))}
        className={`h-16 w-full rounded border-2 border-transparent bg-gray-01 px-4 text-base font-normal leading-none text-brown outline-none placeholder:text-gray-03 focus:border-blue`}
        defaultValue="0"
      >
        <option value="0" disabled>
          Selecione uma plantação
        </option>
        {props.plantations.map((plantation) => (
          <option key={plantation.id} value={plantation.id}>
            {plantation.name}
          </option>
        ))}
      </select>

      {reportResult && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            {reportResult.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col gap-4 border-b border-gray-02 py-4"
              >
                <div className="flex w-full items-center justify-start gap-2 text-orange">
                  {formatActivityIcon(activity.type)}
                  <span className="flex-1 text-base font-semibold capitalize leading-none">
                    {formatActivityType(activity.type)}
                  </span>
                </div>

                <p className="text-base font-normal leading-normal text-gray-05">
                  {activity.description}
                </p>

                <div className="flex w-full items-center justify-start gap-2">
                  <div className="flex items-center justify-between gap-2 rounded bg-gray-01 p-1 text-gray-04">
                    <User weight="bold" size="1rem" />
                    <span className="text-base font-normal leading-none">
                      {activity.user.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 rounded bg-gray-01 p-1 text-gray-04">
                    <CalendarBlank weight="bold" size="1rem" />
                    <span className="text-base font-normal leading-none">
                      {formatDate({ date: activity.executionDate! })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
