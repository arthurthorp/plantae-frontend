import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={`flex h-16 w-full items-center justify-center rounded text-base font-bold leading-none text-white hover:shadow-dark-hover ${
        props.color ?? 'bg-orange'
      }`}
      type="submit"
      {...props}
    />
  )
}
