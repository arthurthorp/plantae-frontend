interface UserProps {
  id?: number
  name: string
  email: string
  emailVerifiedAt?: string
  phone: string
  isOwner: boolean
  birthDate: string
  password?: string
  updatedAt?: Date
  createdAt?: Date
}

export class User {
  public id: number | undefined
  public name: string
  public email: string
  public emailVerifiedAt: string | undefined
  public phone: string
  public isOwner: boolean
  public birthDate: string
  public password: string | undefined
  public updatedAt: Date | undefined
  public createdAt: Date | undefined

  constructor(props: UserProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.emailVerifiedAt = props.emailVerifiedAt
    this.phone = props.phone
    this.isOwner = props.isOwner
    this.birthDate = props.birthDate
    this.password = props.password
    this.updatedAt = props.updatedAt
    this.createdAt = props.createdAt
  }
}
