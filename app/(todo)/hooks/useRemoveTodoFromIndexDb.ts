import { db } from "@/db/db.model"
import { useCallback } from "react"

function useRemoveTodoFromIndexDb(todo: string | undefined, todoId: number) {
    return useCallback(async () => {

    }, [todo])
}

export default useRemoveTodoFromIndexDb
