"use server"

import * as z from "zod"
import { LoginSchema } from "@/schemas"

export type LoginStatusType = {
    status: number,
    message: string
}
export const login = async (value: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(value)

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