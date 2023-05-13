/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import env from '../env'
import { ResponseGetTodos } from '../types/todo'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  tagTypes: ['todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<ResponseGetTodos[], { userId: string }>({
      query: ({ userId }: { userId: string }) => ({
        url: `/todo/${userId}`,
        method: 'GET',
      }),
      providesTags: ['todos'],
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
    createTodo: builder.mutation({
      query: ({ name, owner }: { name: string; owner: string }) => ({
        url: '/todo/',
        method: 'POST',
        body: { name, owner },
      }),
      invalidatesTags: ['todos'],
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
    updateTodo: builder.mutation({
      query: ({ todoId, name }: { todoId: string; name: string }) => ({
        url: `/todo/${todoId}`,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['todos'],
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
    deleteTodo: builder.mutation({
      query: ({ todoId }: { todoId: string }) => ({
        url: `/todo/${todoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todos'],
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
    createTodoList: builder.mutation({
      query: ({ todoId, name }: { todoId: string; name: string }) => ({
        url: '/todo/todo-list',
        method: 'POST',
        body: { todoId, name },
      }),
      invalidatesTags: ['todos'],
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
    updateTodoList: builder.mutation({
      query: ({
        todoId,
        todoListId,
        name,
      }: {
        todoId: string
        todoListId: string
        name: string
      }) => ({
        url: `/todo/${todoId}/${todoListId}`,
        method: 'PUT',
        body: { todoId, name },
      }),
      invalidatesTags: ['todos'],
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
    deleteTodoList: builder.mutation({
      query: ({ todoId, todoListId }: { todoId: string; todoListId: string }) => ({
        url: `/todo/${todoId}/${todoListId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todos'],
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
    updateStatusTodoList: builder.mutation({
      query: ({
        todoId,
        todoListId,
        isDone,
      }: {
        todoId: string
        todoListId: string
        isDone: boolean
      }) => ({
        url: `/todo/${todoId}/${todoListId}/${isDone.toString()}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['todos'],
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
  }),
})

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useCreateTodoListMutation,
  useUpdateTodoListMutation,
  useDeleteTodoListMutation,
  useUpdateStatusTodoListMutation,
} = todoApi
