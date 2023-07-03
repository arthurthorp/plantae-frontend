import { useFormContext } from 'react-hook-form'

interface ErrorMessageProps {
  field: string
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      )

  const result = travel(/[,[\]]+?/) || travel(/,[\].]+?/)

  return result
}

export function ErrorMessage(props: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext()

  const fieldError = get(errors, props.field)

  if (!fieldError) {
    return null
  }

  return (
    <span className="w-full text-base font-normal leading-none text-red">
      {fieldError.message?.toString()}
    </span>
  )
}
