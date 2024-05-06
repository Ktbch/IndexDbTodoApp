import { db } from "@/db/db.model"
import { useCallback } from "react"

function useSendTodoToIndexDb(newTodo: string | undefined) {
    return useCallback(async () => {
        if (!newTodo) throw new Error('new Todo cannot be empty')
        await db.addTodoListToIndexDb('todoList', { todo: newTodo })
    }, [newTodo])
}

export default useSendTodoToIndexDb
