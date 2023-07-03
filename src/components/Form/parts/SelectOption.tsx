import { OptionHTMLAttributes } from 'react'

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {}

export function SelectOption(props: OptionProps) {
  return (
    <option
      className={`h-16 w-full rounded border-2 border-transparent bg-gray-01 px-4 text-base font-normal leading-none text-brown outline-none placeholder:text-gray-03 focus:border-blue`}
      {...props}
    >
      {props.children}
    </option>
  )
}
