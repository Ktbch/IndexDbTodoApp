'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useEffect } from "react";
import { useState } from "react";
import useGetTodo from "../hooks/useGetTodoFromIndexDb";
import useSendTodoToIndexDb from "../hooks/useSendTodoToIndexDb";




export default function Form() {
    const [input, setInput] = useState<string>()
    const sendTodoToIndexDb = useSendTodoToIndexDb(input)

    // you can use server action
    //  react-hook-form

    const handleAddTodoButtonClick = async () => {
        if (!input) throw new Error('please provide a new Todo value')
        sendTodoToIndexDb()
        setInput('')
    }

    return (
        <div className=" container mx-auto px-5 py-10">
            <form onSubmit={() => { handleAddTodoButtonClick() }}>
                <div className="flex flex-col items-center gap-10  md:flex-row">
                    <Input required type="text" className="w-1/2" placeholder="Add todo" onChange={(e) => { setInput(e.target.value) }} />
                    <Button >
                        Add Todo
                    </Button>
                </div>
            </form>
        </div >
    )
}

