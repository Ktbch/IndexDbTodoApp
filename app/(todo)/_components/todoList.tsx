'use client'

import React, { useCallback } from 'react'
import useGetTodoListFromIndexDb from '../hooks/useGetTodoFromIndexDb'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useRemoveTodoFromIndexDb from '../hooks/useRemoveTodoFromIndexDb'
import { db } from '@/db/db.model'

function TodoList() {
    const todoList = useGetTodoListFromIndexDb()
    // const deleteTodo = useRemoveTodoFromIndexDb

    // const handleDeleteTodoButtonClick = async (todo: string, todoId: number) => {

    //     await db.todoList.delete({
    //         id: todoId,
    //         todo: todo

    //     })

    // }

    const content = (
        <Card className=' container h-96 overflow-y-auto flex flex-col gap-10 py-10'>
            {todoList?.map((todo) => (
                <Card key={todo.id} className='container px-10 mx-auto py-5'>
                    <CardContent className='flex items-center justify-between'>
                        <h3>{todo.todo}</h3>
                        <Button key={todo.id} className='bg-red-500 hover:bg-red-600'>Delete Todo</Button>
                    </CardContent>
                </Card>
            ))
            }

        </Card >
    )

    return content
}

export default TodoList
