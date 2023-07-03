'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import { SignInData, signInSchema } from '@/schemas/signIn'
import axios from 'axios'

export default function SignIn() {
  const router = useRouter()

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  async function handleSignIn(data: SignInData) {
    const response = await axios.post('http://0.0.0.0/api/auth/login', data)

    if (!response.data.token) return

    setCookie(undefined, 'plantae.token', response.data.token, {
      maxAge: 60 * 60 * 24 * 7 * 1, // 1 week
    })

    router.push('/myaccount')
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-44 w-full items-center justify-center bg-gray-01">
        <Image
          src="/svg/logotype.svg"
          alt="Logotype image"
          width={252}
          height={64}
        />
      </header>

      <main className="flex w-full flex-col gap-8 px-6 py-8">
        <div className="flex w-full flex-col items-stretch">
          <h1 className="text-3xl font-bold leading-normal text-brown">
            Entrar na conta
          </h1>
          <h4 className="text-base font-normal leading-normal text-gray-03">
            Informe seus dados para acessar sua conta no{' '}
            <span className="font-bold text-orange">Plantae</span>.
          </h4>
        </div>

        <div className="flex flex-col gap-4">
          {/* <SignInForm /> */}

          <FormProvider {...signInForm}>
            <form
              className="flex w-full flex-col gap-8"
              onSubmit={signInForm.handleSubmit(handleSignIn)}
            >
              <div className="flex w-full flex-col gap-4">
                <Form.Field>
                  <Form.Label htmlFor="email">Endereço de e-mail</Form.Label>
                  <Form.Input
                    type="email"
                    name="email"
                    placeholder="Forneça seu endereço de e-mail"
                  />
                  <Form.ErrorMessage field="email" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="password">Senha de acesso</Form.Label>
                  <Form.Input
                    type="password"
                    name="password"
                    placeholder="Forneça sua senha de acesso"
                  />
                  <Form.ErrorMessage field="password" />
                </Form.Field>
              </div>

              <div className="flex w-full flex-col">
                <Form.Button>Entrar na minha conta</Form.Button>

                {/* <Toast.Provider swipeDirection="up">
                  <Toast.Root
                    className="bg-red p-6 text-base font-medium leading-normal text-white transition-all"
                    open={toastOpen}
                    onOpenChange={setToastOpen}
                  >
                    <Toast.Title className="ToastTitle">
                      {toastMessage}
                    </Toast.Title>
                  </Toast.Root>

                  <Toast.Viewport className="fixed bottom-0 left-0 w-full" />
                </Toast.Provider> */}
              </div>
            </form>
          </FormProvider>

          <Link
            className="text-center text-base font-normal leading-none text-gray-03 underline"
            href="/register"
          >
            Não tem uma conta? Crie uma aqui
          </Link>
        </div>
      </main>
    </div>
  )
}
