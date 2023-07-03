'use client'

import Link from 'next/link'

interface TabsItemProps {
  label: string
  path: string
  selected: boolean
}

export default function TabsItem(props: TabsItemProps) {
  return (
    <Link
      key={props.label}
      href={props.path}
      data-selected={props.selected}
      className="flex items-center justify-center rounded bg-gray-01 px-4 py-3 text-sm font-normal leading-none text-gray-03 data-[selected=true]:bg-orange data-[selected=true]:text-white"
    >
      {props.label}
    </Link>
  )
}
