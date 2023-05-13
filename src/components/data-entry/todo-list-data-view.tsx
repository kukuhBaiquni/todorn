import React, { Fragment, useRef } from 'react'
import NoData from '../common/no-data'
import { ScrollView, View } from 'react-native'
import TodoListCard from './todo-list-card'
import { TodoListItem } from '../../types/todo'

export default function TodoListDataView({
  data,
  todoId,
}: {
  data: TodoListItem[]
  todoId: string
}) {
  const scrollRef = useRef<ScrollView>(null)

  const onContentSizeChange = () => {
    scrollRef?.current?.scrollToEnd()
  }

  return (
    <Fragment>
      {data.length ? (
        <ScrollView
          onContentSizeChange={onContentSizeChange}
          style={{ paddingTop: 10 }}
          ref={scrollRef}
        >
          {data.map((item) => (
            <TodoListCard key={item._id} {...item} todoId={todoId} />
          ))}
          <View style={{ height: 50 }} />
        </ScrollView>
      ) : (
        <NoData />
      )}
    </Fragment>
  )
}
