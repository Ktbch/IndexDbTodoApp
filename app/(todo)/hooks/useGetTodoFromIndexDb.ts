import { db } from "@/db/db.model"
import { TtodoList } from "@/types/types"
import { useEffect, useMemo, useState } from "react"



function useGetTodoListFromIndexDb() {
    const [todoList, setTodoList] = useState<TtodoList[]>()
    // const fetchedTodoList = db.todoL

    useEffect(() => {
        async function fetchedTodoList() {
            try {
                const todoListFromIndexDb = await db.todoList.toArray()
                setTodoList(todoListFromIndexDb)
            } catch (error) {
                throw error
            }
        }
        fetchedTodoList()
    })

    const memorizedTodoList = useMemo(() => todoList, [todoList])
    return memorizedTodoList
}

export default useGetTodoListFromIndexDb
