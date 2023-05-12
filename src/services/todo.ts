/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import env from '../env'

export type TodoListItem = {
  name: string
  isDone: boolean
  createdAt: string
  _id: string
}

export type ResponseGetTodos = {
  createdAt: string
  name: string
  owner: string
  todoList: TodoListItem[]
  updatedAt: string
  __v: number
  _id: string
}

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
      query: ({ todoId }: { todoId: string; name: string }) => ({
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
        url: `/todo/todo-list/${todoId}/${todoListId}`,
        method: 'POST',
        body: { todoId, name },
      }),
      invalidatesTags: ['todos'],
      transformResponse: (res: any) => res.data,
      transformErrorResponse: (res: any) => res.status,
    }),
    deleteTodoList: builder.mutation({
      query: ({ todoId, todoListId }: { todoId: string; todoListId: string }) => ({
        url: `/todo/todo-list/${todoId}/${todoListId}`,
        method: 'DELETE',
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
} = todoApi
