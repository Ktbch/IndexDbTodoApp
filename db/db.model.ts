import { TtodoList } from '@/types/types'
import Dexie, { Table } from 'dexie'

export class DB extends Dexie {
    todoList!: Table<TtodoList>
    constructor() {
        super('mydatabase')
        this.version(1).stores({ todoList: '++id, todo' })
    }
}

export const db = new DB()