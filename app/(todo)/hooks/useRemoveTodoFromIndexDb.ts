import { db } from "@/db/db.model"
import { useCallback } from "react"

function useRemoveTodoFromIndexDb(todo: string | undefined, todoId: number) {
    return useCallback(async () => {

        await db.todoList.delete({
            id: todoId,
            todo: todo

        })
    }, [todo])
}

export default useRemoveTodoFromIndexDb
