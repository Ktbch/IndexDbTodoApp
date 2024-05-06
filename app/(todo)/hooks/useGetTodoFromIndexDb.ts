import { db } from "@/db/db.model"
import { TtodoList } from "@/types/types"
import { useEffect, useMemo, useState } from "react"



function useGetTodoListFromIndexDb() {
    const [todoList, setTodoList] = useState<TtodoList[] | undefined>()
    // const fetchedTodoList = db.todoL

    useEffect(() => {
        async function fetchedTodoList() {
            try {
                const todoListFromIndexDb = await db.getTodoListFromIndexDb('todoList')
                // console.log(todoListFromIndexDb)
                if (!todoListFromIndexDb) return []
                setTodoList(todoListFromIndexDb)
            } catch (error) {
                throw error
            }
        }
        fetchedTodoList()
    }, [todoList])

    const memorizedTodoList = useMemo(() => todoList, [todoList])
    return memorizedTodoList
}

export default useGetTodoListFromIndexDb
