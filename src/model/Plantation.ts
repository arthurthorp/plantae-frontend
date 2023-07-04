import { User } from './User'

interface PlantationProps {
  id?: number
  name: string
  description: string
  cultivation: string
  plantingDate: Date
  estimateHarvestDate: Date
  plantationSize: number
  user?: User
  updatedAt?: Date
  createdAt?: Date
}

export class Plantation {
  public id: number | undefined
  public name: string
  public description: string
  public cultivation: string
  public plantingDate: Date
  public estimateHarvestDate: Date
  public plantationSize: number
  public user: User | undefined
  public updatedAt: Date | undefined
  public createdAt: Date | undefined

  constructor(props: PlantationProps) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.cultivation = props.cultivation
    this.plantingDate = props.plantingDate
    this.estimateHarvestDate = props.estimateHarvestDate
    this.plantationSize = props.plantationSize
    this.user = props.user
    this.updatedAt = props.updatedAt
    this.createdAt = props.createdAt
  }
}
