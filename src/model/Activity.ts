import { User } from '@/model/User'
import { AgriculturalInput } from './AgriculturalInput'
import { History } from './History'
import { Plantation } from './Plantation'

interface ActivityProps {
  id?: number
  type: string
  image?: File
  imagePath?: string
  description: string
  status: string
  estimateDate: Date
  executionDate?: Date
  plantation: Plantation
  agriculturalInput?: AgriculturalInput
  estimateProdutivity?: number
  realProdutivity?: number
  quantityUsed?: number
  price?: number
  user: User
  updatedAt?: Date
  createdAt?: Date
  histories?: History[]
}

export class Activity {
  public id: number | undefined
  public type: string
  public image: File | undefined
  public imagePath: string | undefined
  public description: string
  public status: string
  public estimateDate: Date
  public executionDate: Date | undefined
  public plantation: Plantation
  public agriculturalInput: AgriculturalInput | undefined
  public estimateProdutivity: number | undefined
  public realProdutivity: number | undefined
  public quantityUsed: number | undefined
  public price: number | undefined
  public user: User
  public updatedAt: Date | undefined
  public createdAt: Date | undefined
  public histories: History[] | undefined

  constructor(props: ActivityProps) {
    this.id = props.id
    this.type = props.type
    this.image = props.image
    this.imagePath = props.imagePath
    this.description = props.description
    this.status = props.status
    this.estimateDate = props.estimateDate
    this.executionDate = props.executionDate
    this.plantation = props.plantation
    this.agriculturalInput = props.agriculturalInput
    this.estimateProdutivity = props.estimateProdutivity
    this.realProdutivity = props.realProdutivity
    this.quantityUsed = props.quantityUsed
    this.price = props.price
    this.user = props.user
    this.updatedAt = props.updatedAt
    this.createdAt = props.createdAt
    this.histories = props.histories
  }
}
