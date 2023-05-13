import { createContext } from 'react'

export type MutationType = 'createTodoList' | 'updateTodoList' | 'updateTodo'

type Props = {
  onOpenModal: (todoId: string, operation: MutationType) => void
} | null

const TodoTabViewContext = createContext<Props>(null)

export default TodoTabViewContext
