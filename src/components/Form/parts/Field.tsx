import { FieldsetHTMLAttributes } from 'react'

interface FieldsProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {}

export function Field(props: FieldsProps) {
  return <fieldset className="flex w-full flex-col gap-2" {...props} />
}
