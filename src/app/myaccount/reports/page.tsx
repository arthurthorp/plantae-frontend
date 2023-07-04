'use client'

import { Alarm, Plant, SkipForward } from '@phosphor-icons/react'
import Link from 'next/link'

import HeaderActivities from '@/components/Header/Activities'

export default async function Reports() {
  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderActivities text="Relatórios" linkBackButton="/myaccount" />

      <div className="flex flex-col gap-4">
        <Link
          href="/myaccount/reports/finished-activities"
          className="flex flex-col gap-4 rounded bg-gray-01 p-6"
        >
          <SkipForward weight="bold" size="3rem" className="text-orange" />
          <span className="text-xl font-semibold leading-normal text-brown">
            Atividades finalizadas
          </span>
        </Link>

        <Link
          href="/myaccount/reports/agricultural-inputs"
          className="flex flex-col gap-4 rounded bg-gray-01 p-6"
        >
          <Plant weight="bold" size="3rem" className="text-orange" />
          <span className="text-xl font-semibold leading-normal text-brown">
            Insumos utilizados
          </span>
        </Link>

        <Link
          href="/myaccount/reports/late-activities"
          className="flex flex-col gap-4 rounded bg-gray-01 p-6"
        >
          <Alarm weight="bold" size="3rem" className="text-orange" />
          <span className="text-xl font-semibold leading-normal text-brown">
            Atividades atrasadas
          </span>
        </Link>
      </div>
    </div>
  )
}
