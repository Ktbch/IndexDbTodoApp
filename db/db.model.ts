import { TtodoList } from '@/types/types'


export enum Stores {
    todoList = 'todoList'
}

export class DB {
    private db: IDBDatabase | null = null;
    private version = 1

    constructor(private dbName: string) { }


    private upgradeIndexDbDatabse() {
        if (!this.db!.objectStoreNames.contains(Stores.todoList)) {
            this.db!.createObjectStore(Stores.todoList, { keyPath: 'id', autoIncrement: true })
        }
        return
    }

    public async initIndexDb() {
        try {
            const request = indexedDB.open(this.dbName, this.version)
            request.onupgradeneeded = () => {
                this.db = request.result
                this.upgradeIndexDbDatabse()
            }
            await new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    this.db = request.result
                    this.version = this.db.version
                    resolve(true)
                    return
                }

                request.onerror = () => {
                    resolve(false)
                    throw new Error('Error could not initailaze')
                }
            })
            return true
        } catch (error) {
            throw error
            return false
        }

    }


    private async performTransaction(storeName: string, operation: (store: IDBObjectStore) => IDBRequest) {
        try {
            if (!this.db) return
            const tx = this.db!.transaction(storeName, 'readwrite')
            const store = tx.objectStore(storeName)
            const request = operation(store)

            await new Promise((resolve) => {
                request.onsuccess = (() => {
                    resolve(request.result)
                    return
                })
                request.onerror = () => {
                    const errorMessage = request.error?.message || 'something went wrong'
                    resolve(errorMessage)
                    throw new Error(errorMessage)
                }
            })
        } catch (error) {
            throw error
        }
    }
    private async _addTodoListToIndexDb(storeName: string, data: TtodoList) {
        return this.performTransaction(storeName, store => store.add(data))
    }
    public async addTodoListToIndexDb(storeName: string, data: TtodoList) {
        return this._addTodoListToIndexDb(storeName, data)
    }

    // private async _getTodoListFromIndexDb(storeName: string) {
    //     return this.performTransaction(storeName, store => store.getAll())
    // }
    // private async _removeTodoItemFromIndexDb(storeName: string, id: string) {
    //     return this.performTransaction(storeName, store => store.delete(id))
    // }


    public async getTodoListFromIndexDb(storeName: string): Promise<TtodoList[] | undefined> {
        try {
            if (!this.db) return
            const tsx = this.db!.transaction(storeName, 'readonly')
            const store = tsx.objectStore(storeName)
            const request = store.getAll()

            await new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    resolve(request.result)
                    return
                }
                request.onerror = () => {
                    const errorMessage = request.error?.message || 'Something went wrong'
                    resolve(errorMessage)
                    throw errorMessage
                }

            })
            return request.result
        } catch (error) {
            throw error
        }

    }
    public async removeTodoItemFromIndexDb(storeName: string, id: number) {
        try {
            if (!this.db) return
            const tx = this.db.transaction(storeName, 'readwrite')
            const store = tx.objectStore(storeName)
            const request = store.delete(id)

            await new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    resolve(request.result)
                    console.log('deleted successfully')
                }
                request.onerror = () => {
                    const errorMessage = request.error?.message || 'Something went wrong'
                    throw new Error(errorMessage)
                }
            })
        } catch (error) {
            throw error
        }
    }

    public async deleteIndexDb() {
        try {
            await this.closeDatabase()
            const request = indexedDB.deleteDatabase(this.dbName)
            await new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    console.log('IndexDb delete was succesful')
                    resolve(request.result)
                }
                request.onerror = () => {
                    const errorMessage = request.error?.message || 'Something went wrong'
                    reject(new Error(errorMessage))
                    return
                }
            })
            await this.initIndexDb()
        } catch (error) {
            throw error
        }
    }
    private async closeDatabase() {
        return new Promise(() => {
            if (this.db) {
                this.db.close()
                this.db = null
            }
        })
    }

}



export const db = new DB('todoList')
db.initIndexDb()