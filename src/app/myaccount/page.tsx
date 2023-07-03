import ActivityList from '@/components/Activity/List'
import HeaderDashboard from '@/components/Header/Dashboard'

export default async function Dashboard() {
  return (
    <div className="flex w-full flex-col gap-6 px-6 py-6">
      <HeaderDashboard />

      <p className="text-base font-normal leading-normal text-gray-03">
        <span className="font-semibold text-orange">Olá!</span> Bom, aqui vão
        algumas informações para você
      </p>

      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold leading-none text-brown">
          Próximas atividades
        </span>

        <ActivityList isItemsShort />
      </div>
    </div>
  )
}
