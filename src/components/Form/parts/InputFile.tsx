'use client'

import { Camera } from '@phosphor-icons/react'
import Image from 'next/image'
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  previewName?: string
}

export function InputFile(props: InputFileProps) {
  const { register, watch } = useFormContext()

  return (
    <label
      htmlFor={props.name}
      className="flex flex-col overflow-hidden rounded bg-gray-01"
    >
      <input
        id={props.name}
        type="file"
        className={`hidden `}
        {...register(props.name)}
        {...props}
      />

      {props.previewName && (
        <div className="flex h-32 w-full flex-col items-center justify-center overflow-hidden">
          <Image
            src={watch(props.previewName) ?? '/image/default.png'}
            alt="preview"
            width={550}
            height={128}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <div className="flex h-16 w-full items-center justify-center gap-2 px-4">
        <Camera weight="bold" size="1.5rem" className="text-gray-03" />
        <span
          data-isPlaceholder={!watch(props.name)?.[0]?.name}
          className="flex-1 text-base font-normal leading-none text-brown data-[isPlaceholder=true]:text-gray-03"
        >
          {watch(props.name)?.[0]?.name ?? props.placeholder}
        </span>
      </div>
    </label>
  )
}
