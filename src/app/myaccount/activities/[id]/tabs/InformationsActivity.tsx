import UpdateActivityForm from '@/components/Form/UpdateActivity'

import { Activity } from '@/model/Activity'

import { AgriculturalInputService } from '@/service/agriculturalInput/AgriculturalInputServerService'
import { PlantationService } from '@/service/plantation/PlantationServerService'
import { UserService } from '@/service/user/UserServerService'

async function listAgriculturalInputs() {
  const agriculturalInputService = new AgriculturalInputService()
  const agriculturalInputs =
    await agriculturalInputService.listAgriculturalInput()
  return agriculturalInputs
}

async function listPlantations() {
  const plantationService = new PlantationService()
  const plantations = await plantationService.listPlantations()
  return plantations
}

async function getUserAuthenticated() {
  const userService = new UserService()
  const user = await userService.getUserAuthenticated()
  return user
}

export default async function InformationsActivity(props: {
  activity: Activity
}) {
  if (!props.activity.id) return

  const agriculturalInputs = await listAgriculturalInputs()
  const plantations = await listPlantations()
  const user = await getUserAuthenticated()

  return (
    <UpdateActivityForm
      activity={JSON.parse(JSON.stringify(props.activity))}
      agriculturalInputs={JSON.parse(JSON.stringify(agriculturalInputs))}
      plantations={JSON.parse(JSON.stringify(plantations ?? []))}
      user={JSON.parse(JSON.stringify(user))}
    />
  )
}
