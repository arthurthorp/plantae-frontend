import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('plantae.token')

    if (!token) return NextResponse.redirect(new URL('/signin', request.url))

    const response = await fetch('http://0.0.0.0/api/user', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token.value}`,
      },
    })

    const user = await response.json()

    if (!user) return NextResponse.redirect(new URL('/signin', request.url))

    request.cookies.set('plantae.user', JSON.stringify(user))

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: ['/myaccount/:path*'],
}
