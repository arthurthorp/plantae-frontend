import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'

import MenuNavigation from '@/components/MenuNavigation/MenuNavigation'

import '../globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'Plantae | Início',
  description: 'Plantae | Sua plantação no digital',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="pb-[112px]">{children}</div>

        <MenuNavigation />
      </body>
    </html>
  )
}
