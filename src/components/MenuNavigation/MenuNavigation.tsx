'use client'

import { House, Notepad, Plant } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MenuNavigation() {
  const pathname = usePathname()

  const menu = {
    dashboard: {
      url: '/myaccount',
      regex: /^\/myaccount\/?$/,
      current: false,
    },
    plantations: {
      url: '/myaccount/plantations',
      regex: /^\/myaccount\/plantations\/?/,
      current: false,
    },
    reports: {
      url: '/myaccount/reports',
      regex: /^\/myaccount\/reports\/?/,
      current: false,
    },
    activities: {
      url: '/myaccount/activities',
      regex: /^\/myaccount\/activities\/?/,
      current: false,
    },
  }

  if (pathname.match(menu.dashboard.regex)) {
    menu.dashboard.current = true
  } else if (pathname.match(menu.plantations.regex)) {
    menu.plantations.current = true
  } else if (pathname.match(menu.reports.regex)) {
    menu.reports.current = true
  } else if (pathname.match(menu.activities.regex)) {
    menu.activities.current = true
  }

  return (
    <div
      data-hidden={menu.activities.current}
      className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between bg-white px-6 py-6 data-[hidden=true]:hidden"
    >
      <div className="flex flex-1 items-center justify-start">
        <Link
          href={menu.plantations.url}
          data-current={menu.plantations.current}
          className="flex flex-col items-center justify-center gap-2 rounded bg-transparent px-4 py-2 text-gray-05 hover:bg-gray-01 data-[current=true]:bg-orange-translucid data-[current=true]:text-orange"
        >
          <Plant weight="regular" size="1.5rem" />
          <span className="text-base font-normal leading-none">Plantações</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Link
          href={menu.dashboard.url}
          data-current={menu.dashboard.current}
          className="flex flex-col items-center justify-center gap-2 rounded bg-transparent px-4 py-2 text-gray-05 hover:bg-gray-01 data-[current=true]:bg-orange-translucid data-[current=true]:text-orange"
        >
          <House weight="regular" size="1.5rem" />
          <span className="text-base font-normal leading-none">Início</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end">
        <Link
          href={menu.reports.url}
          data-current={menu.reports.current}
          className="flex flex-col items-center justify-center gap-2 rounded bg-transparent px-4 py-2 text-gray-05 hover:bg-gray-01 data-[current=true]:bg-orange-translucid data-[current=true]:text-orange"
        >
          <Notepad weight="regular" size="1.5rem" />
          <span className="text-base font-normal leading-none">Relatórios</span>
        </Link>
      </div>
    </div>
  )
}
