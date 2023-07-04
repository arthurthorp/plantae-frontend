// 'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useRouter } from 'next/navigation'
// import { setCookie } from 'nookies'
// import { FormProvider, useForm } from 'react-hook-form'

// import { Form } from '@/components/Form/parts'

// import { SignInData, signInSchema } from '@/schemas/signIn'
// import { serviceSignIn } from '@/service/signIn'

// export default function SignInForm() {
//   const router = useRouter()

//   // const [toastOpen, setToastOpen] = useState<boolean>(false)
//   // const [toastMessage, setToastMessage] = useState<string>('')

//   const signInForm = useForm<SignInData>({
//     resolver: zodResolver(signInSchema),
//   })

//   async function handleSignIn(data: SignInData) {
//     const token = await serviceSignIn(data)

//     if (!token) return

//     setCookie(undefined, 'plantae.token', token, {
//       maxAge: 60 * 60 * 24 * 7 * 1, // 1 week
//     })

//     router.push('/')
//   }

//   return (
//     <FormProvider {...signInForm}>
//       <form
//         className="flex w-full flex-col gap-8"
//         onSubmit={signInForm.handleSubmit(handleSignIn)}
//       >
//         <div className="flex w-full flex-col gap-4">
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
//             <Form.Label htmlFor="password">Senha de acesso</Form.Label>
//             <Form.Input
//               type="password"
//               name="password"
//               placeholder="Forneça sua senha de acesso"
//             />
//             <Form.ErrorMessage field="password" />
//           </Form.Field>
//         </div>

//         <div className="flex w-full flex-col">
//           <Form.Button>Entrar na minha conta</Form.Button>

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
