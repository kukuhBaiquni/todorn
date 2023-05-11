const fallback = 'We are working on getting this fixed as soon as we can'
export default function errType(num: number) {
  return (
    {
      409: 'Name has been taken! Please choose another one',
      422: 'Name too long/short',
    }[num] || fallback
  )
}
