import dayjs from 'dayjs'

export default function commonFormat(date: Date) {
  const isValid = dayjs(date).isValid()
  if (isValid) {
    return dayjs(date).format('DD MMM YYYY HH:mm A')
  }
}
