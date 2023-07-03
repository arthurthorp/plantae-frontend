'use client'

import {
  CalendarBlank,
  Drop,
  Leaf,
  Plus,
  Scissors,
} from '@phosphor-icons/react'
import moment from 'moment'
import { parseCookies } from 'nookies'

async function getResume(plantationId: string) {
  const { 'plantae.token': token } = parseCookies()

  const res = await fetch(
    `http://0.0.0.0/api/plantations/${plantationId}/activities/resume`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  const response = await res.json()

  if (!response.object) return

  return response.object
}

function formatDate(date: string) {
  if (!date) return '-'

  const dateSplited = date.split('-')
  const newDate = new Date(
    `${dateSplited[1]}-${dateSplited[2]}-${dateSplited[0]}`,
  )

  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  console.log(newDate)
  console.log(today)
  console.log(yesterday)

  if (newDate.toDateString() === today.toDateString()) {
    return 'hoje'
  }

  if (newDate.toDateString() === yesterday.toDateString()) {
    return 'ontem'
  }

  return `em ${moment(newDate).format('DD MMM YYYY')}`
}

export default async function ActivitiesPlantation(props: {
  plantationId: string
}) {
  const resume = await getResume(props.plantationId)

  console.log(resume.irrigation)

  if (!resume) return

  return (
    <div className="flex flex-col items-stretch gap-8">
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 border-b border-gray-02 py-5">
          <div className="flex items-center gap-2">
            <Drop weight="bold" size="1rem" className="text-brown" />
            <span className="flex-1 text-base font-semibold leading-none text-brown">
              Irrigação
            </span>
            <Plus weight="bold" size="1rem" className="text-gray-03" />
          </div>
          <div className="flex items-center gap-2 text-gray-03">
            <CalendarBlank weight="bold" size="1rem" />
            <span className="flex-1 text-base font-normal leading-none">
              {resume.irrigation ? (
                <>
                  Última realizada{' '}
                  <b className="font-semibold text-gray-04">
                    {formatDate(resume.irrigation.executionDate)}
                  </b>
                </>
              ) : (
                <>Ainda não foi realizada</>
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-gray-02 py-5">
          <div className="flex items-center gap-2">
            <Leaf weight="bold" size="1rem" className="text-brown" />
            <span className="flex-1 text-base font-semibold leading-none text-brown">
              Insumos
            </span>
            <Plus weight="bold" size="1rem" className="text-gray-03" />
          </div>
          <div className="flex items-center gap-2 text-gray-03">
            <CalendarBlank weight="bold" size="1rem" />
            <span className="flex-1 text-base font-normal leading-none">
              {resume.agricultural_input ? (
                <>
                  Último aplicado{' '}
                  <b className="font-semibold text-gray-04">
                    {formatDate(resume.agricultural_input.executionDate)}
                  </b>
                </>
              ) : (
                <>Ainda não foi aplicado</>
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-gray-02 py-5">
          <div className="flex items-center gap-2">
            <Scissors weight="bold" size="1rem" className="text-brown" />
            <span className="flex-1 text-base font-semibold leading-none text-brown">
              Poda
            </span>
            <Plus weight="bold" size="1rem" className="text-gray-03" />
          </div>
          <div className="flex items-center gap-2 text-gray-03">
            <CalendarBlank weight="bold" size="1rem" />
            <span className="flex-1 text-base font-normal leading-none">
              {resume.paring ? (
                <>
                  Última realizada{' '}
                  <b className="font-semibold text-gray-04">
                    {formatDate(resume.paring.executionDate)}
                  </b>
                </>
              ) : (
                <>Ainda não foi realizada</>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-4">
        <h3 className="text-base font-semibold leading-none text-brown">
          Outras atividades
        </h3>
        <div className="flex flex-col items-stretch gap-3">
          {resume.list.map((item: any) => (
            <div key={item.id} className="flex">
              <span className="w-16 text-base font-medium leading-none text-gray-04">
                {item.executionDate
                  ? moment(item.executionDate).format('DD MMM')
                  : '-'}
              </span>
              <span className="flex-1 text-base font-normal leading-none text-gray-04">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
