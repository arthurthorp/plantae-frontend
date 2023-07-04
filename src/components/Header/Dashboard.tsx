'use client'

import { BellSimpleRinging, SignOut } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'

export default async function HeaderDashboard() {
  const router = useRouter()

  async function handleSignOut() {
    destroyCookie(undefined, 'plantae.token')

    router.push('/signin')
  }

  return (
    <header className="flex items-center justify-between gap-2">
      <button
        onClick={() => handleSignOut()}
        className="rounded bg-red-translucid p-2"
      >
        <SignOut weight="bold" size="1.5rem" className="text-red" />
      </button>

      <div className="flex flex-1 items-center justify-start">
        <Image
          src="/svg/logotype.svg"
          alt="Logotype image"
          width={148}
          height={38}
        />
      </div>

      <Link href="/myaccount/activities" className="p-2">
        <BellSimpleRinging weight="bold" size="1.5rem" className="text-brown" />
      </Link>
    </header>
  )
}
