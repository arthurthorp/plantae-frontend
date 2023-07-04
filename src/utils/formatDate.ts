import moment from 'moment'

interface formatDateProps {
  date: Date
  format?: string
}

export function formatDate({ date, format }: formatDateProps) {
  moment.locale('pt-br')

  const dateFormated = moment(date).format(format ?? 'DD MMM YYYY')

  return dateFormated
}
