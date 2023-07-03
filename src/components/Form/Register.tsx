// 'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useRouter } from 'next/navigation'
// import { FormProvider, useForm } from 'react-hook-form'

// import { Form } from '@/components/Form/parts'

// import { CreateUserData, createUserSchema } from '@/schemas/createUser'

// import { serviceCreateUser } from '@/service/createUser'

// export default function RegisterForm() {
//   // const [toastOpen, setToastOpen] = useState<boolean>(false)
//   // const [toastMessage, setToastMessage] = useState<string>('')

//   const router = useRouter()

//   const createUserForm = useForm<CreateUserData>({
//     resolver: zodResolver(createUserSchema),
//   })

//   async function createUser(data: CreateUserData) {
//     const token = await serviceCreateUser(data)

//     if (!token) return

//     // const isSuccessful = 'token' in response

//     // if (!isSuccessful) {
//     //   if (!response.errors) {
//     //     setToastMessage(response.message)
//     //     setToastOpen(true)
//     //   } else {
//     //     if (response.errors.name) {
//     //       createUserForm.setError(
//     //         'name',
//     //         { message: response.errors.name[0] },
//     //         { shouldFocus: true },
//     //       )
//     //     }

//     //     if (response.errors.birthDate) {
//     //       createUserForm.setError(
//     //         'birthDate',
//     //         { message: response.errors.birthDate[0] },
//     //         { shouldFocus: true },
//     //       )
//     //     }

//     //     if (response.errors.phone) {
//     //       createUserForm.setError(
//     //         'phone',
//     //         { message: response.errors.phone[0] },
//     //         { shouldFocus: true },
//     //       )
//     //     }

//     //     if (response.errors.email) {
//     //       createUserForm.setError(
//     //         'email',
//     //         { message: response.errors.email[0] },
//     //         { shouldFocus: true },
//     //       )
//     //     }

//     //     if (response.errors.password) {
//     //       createUserForm.setError(
//     //         'password',
//     //         { message: response.errors.password[0] },
//     //         { shouldFocus: true },
//     //       )
//     //     }
//     //   }

//     //   return
//     // }

//     router.push('/signin')
//   }

//   return (
//     <FormProvider {...createUserForm}>
//       <form
//         className="flex w-full flex-col gap-8"
//         onSubmit={createUserForm.handleSubmit(createUser)}
//       >
//         <div className="flex w-full flex-col gap-4">
//           <Form.Field>
//             <Form.Label htmlFor="name">Nome completo</Form.Label>
//             <Form.Input
//               type="text"
//               name="name"
//               placeholder="Forneça seu nome completo"
//             />
//             <Form.ErrorMessage field="name" />
//           </Form.Field>

//           <Form.Field>
//             <Form.Label htmlFor="birthDate">Data de nascimento</Form.Label>
//             <Form.Input
//               type="date"
//               name="birthDate"
//               placeholder="Forneça sua data de nascimento"
//             />
//             <Form.ErrorMessage field="birthDate" />
//           </Form.Field>

//           <Form.Field>
//             <Form.Label htmlFor="email">Endereço de e-mail</Form.Label>
//             <Form.Input
//               type="email"
//               name="email"
//               placeholder="Forneça seu endereço de e-mail"
//             />
//             <Form.ErrorMessage field="email" />
//           </Form.Field>

//           <Form.Field>
//             <Form.Label htmlFor="phone">Número de telefone</Form.Label>
//             <Form.Input
//               type="text"
//               name="phone"
//               placeholder="Forneça seu número de telefone"
//             />
//             <Form.ErrorMessage field="phone" />
//           </Form.Field>

//           <Form.Field>
//             <Form.Label htmlFor="password">Senha de acesso</Form.Label>
//             <Form.Input
//               type="password"
//               name="password"
//               placeholder="Crie uma senha de acesso"
//             />
//             <Form.ErrorMessage field="password" />
//           </Form.Field>

//           <Form.Field>
//             <Form.Label htmlFor="passwordConfirmation">
//               Confirmação da senha de acesso
//             </Form.Label>
//             <Form.Input
//               type="password"
//               name="passwordConfirmation"
//               placeholder="Confirme sua senha de acesso"
//             />
//             <Form.ErrorMessage field="passwordConfirmation" />
//           </Form.Field>
//         </div>

//         <div className="flex w-full flex-col">
//           <Form.Button>Criar minha conta</Form.Button>

//           {/* <Toast.Provider swipeDirection="up">
//             <Toast.Root
//               className="bg-red p-6 text-base font-medium leading-normal text-white transition-all"
//               open={toastOpen}
//               onOpenChange={setToastOpen}
//             >
//               <Toast.Title className="ToastTitle">{toastMessage}</Toast.Title>
//             </Toast.Root>

//             <Toast.Viewport className="fixed bottom-0 left-0 w-full" />
//           </Toast.Provider> */}
//         </div>
//       </form>
//     </FormProvider>
//   )
// }
