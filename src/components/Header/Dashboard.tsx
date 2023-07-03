'use client'

import { BellSimpleRinging } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'

export default async function HeaderDashboard() {
  return (
    <header className="flex items-center justify-between">
      <Image
        src="/svg/logotype.svg"
        alt="Logotype image"
        width={148}
        height={38}
      />

      <Link href="/myaccount/activities" className="p-2">
        <BellSimpleRinging weight="bold" size="1.5rem" className="text-brown" />
      </Link>
    </header>
  )
}
