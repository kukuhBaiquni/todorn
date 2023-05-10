/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import env from '../env'

export type ResponseRegister = {
  createdAt: string
  name: string
  updatedAt: string
  __v: number
  _id: string
}

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<ResponseRegister, { name: string }>({
      query: ({ name }: { name: string }) => ({
        url: '/auth/register',
        method: 'POST',
        body: { name },
      }),

      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useRegisterUserMutation } = registerApi
