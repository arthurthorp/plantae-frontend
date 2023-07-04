import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <input
      id={props.name}
      className={`h-16 w-full rounded border-2 border-transparent bg-gray-01 px-4 text-base font-normal leading-none text-brown outline-none placeholder:text-gray-03 focus:border-blue`}
      {...register(props.name)}
      {...props}
    />
  )
}
