'use client'

import { CaretLeft, Plus } from '@phosphor-icons/react'
import Link from 'next/link'

interface HeaderPlantationsProps {
  text: string
  showBackButton?: boolean
  showAddButton?: boolean
}

export default async function HeaderPlantations(props: HeaderPlantationsProps) {
  return (
    <header className="flex items-center justify-between">
      {props.showBackButton && (
        <Link
          href="/myaccount/plantations"
          className="flex items-center justify-center p-2 text-brown"
        >
          <CaretLeft weight="bold" size="1.25rem" />
        </Link>
      )}

      <h1 className="flex-1 text-2xl font-bold leading-normal text-brown">
        {props.text}
      </h1>

      {props.showAddButton && (
        <Link
          href="/myaccount/plantations/new"
          className="flex items-center gap-2 rounded bg-orange-translucid p-3 text-orange"
        >
          <span className="text-sm font-medium leading-none">Adicionar</span>
          <Plus weight="bold" size="1rem" />
        </Link>
      )}
    </header>
  )
}
