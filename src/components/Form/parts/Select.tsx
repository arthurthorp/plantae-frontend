import { SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
}

export function Select(props: SelectProps) {
  const { register } = useFormContext()

  return (
    <select
      id={props.name}
      className={`h-16 w-full rounded border-2 border-transparent bg-gray-01 px-4 text-base font-normal leading-none text-brown outline-none placeholder:text-gray-03 focus:border-blue`}
      {...register(props.name)}
      {...props}
    />
  )
}
