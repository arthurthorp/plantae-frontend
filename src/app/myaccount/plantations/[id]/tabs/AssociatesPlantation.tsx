'use client'

import { parseCookies } from 'nookies'

async function getAssociates(plantationId: string) {
  const { 'plantae.token': token } = parseCookies()

  const res = await fetch(
    `http://0.0.0.0/api/plantations/${plantationId}/associates`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  const response = await res.json()

  if (!response.object) return

  return response.object
}

export default async function AssociatesPlantation(props: {
  plantationId: string
}) {
  const associates = await getAssociates(props.plantationId)

  function handleCopyAssociateLink() {
    navigator.clipboard.writeText(
      `http://localhost:3000/register?plantation=${props.plantationId}`,
    )
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <button
        onClick={() => handleCopyAssociateLink()}
        className="flex h-16 w-full items-center justify-center rounded bg-blue-translucid text-base font-medium leading-none text-blue"
      >
        Copiar link para associados
      </button>

      <div className="flex flex-col">
        <h3 className="w-full text-base font-semibold leading-none text-brown">
          Usuários associados
        </h3>
        <div>
          {associates.map((associate: any) => (
            <p
              key={associate.id}
              className="w-full border-b border-gray-02 py-4 text-base font-normal leading-none text-gray-03"
            >
              {associate.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
