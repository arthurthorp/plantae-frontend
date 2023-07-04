import moment from 'moment'

interface TranslateDateProps {
  date: string
}

export function translateDate({ date }: TranslateDateProps) {
  moment.locale('pt-br')

  const dateTranslated = moment(date)

  return dateTranslated.toDate()
}
