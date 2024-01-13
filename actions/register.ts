"use server"

import * as z from "zod"
import { RegisterSchema } from "@/schemas"

export type RegisterStatusType = {
    status: number,
    message: string
}
export const register = async (value: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(value)

    if (!validatedFields.success) {
        return {
            status: 1,
            message: "Invalid fields!"
        }
    }
    return {
        status: 0,
        message: "Email sent!"
    }
}