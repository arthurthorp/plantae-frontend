'use client'

import { useState } from 'react'

import { Plantation } from '@/model/Plantation'

import {
  AgriculturalInputExpensesResponse,
  ReportsService,
} from '@/service/reports/ReportsClientService'

interface InputSearchProps {
  plantations: Plantation[]
}

async function buildReportAgriculturalInput(plantationId: number) {
  const reportsService = new ReportsService()
  const response = await reportsService.getAgriculturalInput(plantationId)
  return response
}

export default function AgriculturalInputContent(props: InputSearchProps) {
  const [reportResult, setReportResult] =
    useState<AgriculturalInputExpensesResponse>()

  async function handleChange(plantationId: number) {
    const report = await buildReportAgriculturalInput(plantationId)
    setReportResult(report)
  }

  function translateType(type: string) {
    switch (type) {
      case 'HERBICIDE':
        return 'Herbicida'
      case 'FUNGICIDE':
        return 'Fungicida'
      case 'FERTILIZER':
        return 'Fertilizante'
    }
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
            {reportResult?.types.map((type) => (
              <div
                key={type.type}
                className="flex items-center border-b border-gray-01 px-2 py-3"
              >
                <span className="flex-[2] text-base font-semibold leading-none text-orange">
                  {translateType(type.type)}
                </span>
                <div className="flex flex-[1] justify-end">
                  <span className="rounded bg-gray-01 p-1 text-base font-normal leading-none text-gray-04">
                    R${' '}
                    {type.totalPrice.toFixed(2).toString().replaceAll('.', ',')}
                  </span>
                </div>
                <div className="flex flex-[1] justify-end">
                  <span className="rounded bg-gray-01 p-1 text-base font-normal leading-none text-gray-04">
                    {type.quantityUsed.toString()} Kg
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center rounded bg-gray-01 px-2 py-4">
            <span className="flex-[2] text-base font-semibold leading-none text-orange">
              Total
            </span>
            <div className="flex flex-[1] justify-end">
              <span className="text-base font-semibold leading-none text-brown">
                R${' '}
                {reportResult?.total.toFixed(2).toString().replaceAll('.', ',')}
              </span>
            </div>
            <div className="flex flex-[1] justify-end">
              <span className="text-base font-semibold leading-none text-brown">
                {reportResult?.total.toFixed(0).toString().replaceAll('.', ',')}{' '}
                Kg
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
