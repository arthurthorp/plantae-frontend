import { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label(props: LabelProps) {
  return (
    <label
      className="w-full text-base font-normal leading-none text-gray-05"
      {...props}
    />
  )
}
