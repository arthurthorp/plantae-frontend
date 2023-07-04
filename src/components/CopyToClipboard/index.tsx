'use client'

interface CopyToClipboardProps {
  title: string
  copy: string
}

export default function CopyToClipboard(props: CopyToClipboardProps) {
  function handleClick() {
    navigator.clipboard.writeText(props.copy)
  }

  return (
    <button
      onClick={() => handleClick()}
      className="flex h-16 w-full items-center justify-center rounded bg-blue-translucid text-base font-medium leading-none text-blue"
    >
      {props.title}
    </button>
  )
}
