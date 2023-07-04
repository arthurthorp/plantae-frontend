'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import { CreateUserData, createUserSchema } from '@/schemas/createUser'

import { User } from '@/model/User'

import { UserService } from '@/service/user/UserClientService'

export default function Register(props: {
  searchParams: { plantation: string }
}) {
  const router = useRouter()

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  async function createUser(data: CreateUserData) {
    const plantation = props.searchParams.plantation

    const user = new User({
      name: data.name,
      email: data.email,
      birthDate: data.birthDate,
      phone: data.phone,
      password: data.password,
      isOwner: plantation === '',
    })

    console.log(user)

    const userService = new UserService()
    const success = await userService.createUser(user, plantation)

    if (!success) return

    router.push('/signin')
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
            Criar uma conta
          </h1>
          <h4 className="text-base font-normal leading-normal text-gray-03">
            Preencha os campos e posicione sua plantação no{' '}
            <span className="font-bold text-orange">mundo digital</span>.
          </h4>
        </div>

        <div className="flex flex-col gap-4">
          <FormProvider {...createUserForm}>
            <form
              className="flex w-full flex-col gap-8"
              onSubmit={createUserForm.handleSubmit(createUser)}
            >
              <div className="flex w-full flex-col gap-4">
                <Form.Field>
                  <Form.Label htmlFor="name">Nome completo</Form.Label>
                  <Form.Input
                    type="text"
                    name="name"
                    placeholder="Forneça seu nome completo"
                  />
                  <Form.ErrorMessage field="name" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="birthDate">
                    Data de nascimento
                  </Form.Label>
                  <Form.Input
                    type="date"
                    name="birthDate"
                    placeholder="Forneça sua data de nascimento"
                  />
                  <Form.ErrorMessage field="birthDate" />
                </Form.Field>

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
                  <Form.Label htmlFor="phone">Número de telefone</Form.Label>
                  <Form.Input
                    type="text"
                    name="phone"
                    placeholder="Forneça seu número de telefone"
                  />
                  <Form.ErrorMessage field="phone" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="password">Senha de acesso</Form.Label>
                  <Form.Input
                    type="password"
                    name="password"
                    placeholder="Crie uma senha de acesso"
                  />
                  <Form.ErrorMessage field="password" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="passwordConfirmation">
                    Confirmação da senha de acesso
                  </Form.Label>
                  <Form.Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirme sua senha de acesso"
                  />
                  <Form.ErrorMessage field="passwordConfirmation" />
                </Form.Field>
              </div>

              <div className="flex w-full flex-col">
                <Form.Button>Criar minha conta</Form.Button>

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
            href="/signin"
          >
            Já tem uma conta? Acesse aqui
          </Link>
        </div>
      </main>
    </div>
  )
}
