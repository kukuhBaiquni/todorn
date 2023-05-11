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

export type ResponseGetTodos = {
  data: Array<object>
  success: boolean
  message: string
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getTodos: builder.query<ResponseGetTodos, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/todo/${id}`,
        method: 'GET',
      }),
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
  }),
})

export const { useGetTodosQuery } = todoApi
