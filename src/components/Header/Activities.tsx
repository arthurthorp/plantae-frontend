'use client'

import { CaretLeft, Plus } from '@phosphor-icons/react'
import Link from 'next/link'

interface HeaderActivitiesProps {
  text: string
  linkBackButton: string
  showAddButton?: boolean
}

export default async function HeaderActivities(props: HeaderActivitiesProps) {
  return (
    <header className="flex items-center justify-between">
      <Link
        href={props.linkBackButton}
        className="flex items-center justify-center p-2 text-brown"
      >
        <CaretLeft weight="bold" size="1.25rem" />
      </Link>

      <h1 className="flex-1 text-2xl font-bold leading-normal text-brown">
        {props.text}
      </h1>

      {props.showAddButton && (
        <Link
          href="/myaccount/activities/new"
          className="flex items-center gap-2 rounded bg-orange-translucid p-3 text-orange"
        >
          <span className="text-sm font-medium leading-none">Adicionar</span>
          <Plus weight="bold" size="1rem" />
        </Link>
      )}
    </header>
  )
}
