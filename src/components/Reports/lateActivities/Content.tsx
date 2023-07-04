'use client'

import { useState } from 'react'

import { Plantation } from '@/model/Plantation'

import { ReportsService } from '@/service/reports/ReportsClientService'

interface InputSearchProps {
  plantations: Plantation[]
}

async function buildReportLateActivities(plantationId: number) {
  const reportsService = new ReportsService()
  const response = await reportsService.getLateActivities(plantationId)
  return response
}

export default function LateActivitiesContent(props: InputSearchProps) {
  const [reportResult, setReportResult] = useState<{
    quantity: number
    dateAverage: number
  }>()

  async function handleChange(plantationId: number) {
    const report = await buildReportLateActivities(plantationId)
    console.log(report)
    setReportResult(report)
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
          <div className="flex flex-col gap-2 rounded bg-gray-01 p-6">
            <span className="text-base font-semibold leading-normal text-gray-04">
              Total de tarefas que foram entregues atrasadas
            </span>
            <span className="text-5xl font-bold leading-none text-orange">
              {reportResult.quantity}
            </span>
          </div>

          <div className="flex flex-col gap-2 rounded bg-gray-01 p-6">
            <span className="text-base font-semibold leading-normal text-gray-04">
              Médias de dias de atraso
            </span>
            <span className="text-5xl font-bold leading-none text-orange">
              {reportResult.dateAverage}{' '}
              {reportResult.dateAverage > 1 ? 'dias' : 'dia'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
