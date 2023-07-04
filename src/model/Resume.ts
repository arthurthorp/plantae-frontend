interface ResumeItemProps {
  id?: number
  description?: string
  type: string
  executionDate?: Date
}

export class Resume {
  public irrigation?: ResumeItemProps
  public agriculturalInput?: ResumeItemProps
  public paring?: ResumeItemProps
  public list: ResumeItemProps[] = []

  setIrrigation(item: ResumeItemProps) {
    this.irrigation = item
  }

  setAgriculturalInput(item: ResumeItemProps) {
    this.agriculturalInput = item
  }

  setParing(item: ResumeItemProps) {
    this.paring = item
  }

  setList(item: ResumeItemProps[]) {
    this.list = item
  }
}
