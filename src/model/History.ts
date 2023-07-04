interface HistoryProps {
  id?: number
  description: string
  image?: File
  imagePath?: string
  isImpediment: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class History {
  public id: number | undefined
  public description: string
  public image: File | undefined
  public imagePath: string | undefined
  public isImpediment: boolean
  public createdAt: Date | undefined
  public updatedAt: Date | undefined

  constructor(props: HistoryProps) {
    this.id = props.id
    this.description = props.description
    this.image = props.image
    this.imagePath = props.imagePath
    this.isImpediment = props.isImpediment
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }
}
