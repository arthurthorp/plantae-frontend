interface AgriculturalInputProps {
  id: number
  name: string
  type: 'FERTILIZER' | 'FUNGICIDE' | 'HERBICIDE' | 'OTHER'
  rules: string
}

export class AgriculturalInput {
  public id: number
  public name: string
  public type: 'FERTILIZER' | 'FUNGICIDE' | 'HERBICIDE' | 'OTHER'
  public rules: string

  constructor(props: AgriculturalInputProps) {
    this.id = props.id
    this.name = props.name
    this.type = props.type
    this.rules = props.rules
  }
}
