export type ErrorMessage = {
  409: string
  422: string
}

const errType: ErrorMessage = {
  409: 'Name has been taken! Please choose another one',
  422: 'Name too long',
}

export default errType

export const fallback = 'We are working on getting this fixed as soon as we can'
