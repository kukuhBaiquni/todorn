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
