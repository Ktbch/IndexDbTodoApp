import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email Adress' }),
    password: z.string().min(3, { message: "Password Must  not be less Than (3) charcters" }).max(8, { message: "Password Must not be greater Than (8) characters " })
})

export const signupSchema = z.object({
    fullname: z.string().min(3, { message: 'Full name must be greater than (3) charcters ' }),
    email: z.string().email({ message: 'Invalid email Adress' }),
    password: z.string().min(3, { message: "Password Must  not be less Than (3) charcters" }).max(8, { message: "Password Must not be greater Than (8) characters " })
})


export type TtodoList = {
    id?: number
    todo: string
}

export type TloginSchema = z.infer<typeof loginSchema>
export type TsignupSchema = z.infer<typeof signupSchema>