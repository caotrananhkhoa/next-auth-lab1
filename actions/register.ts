"use server"

import * as z from "zod"
import { RegisterSchema } from "@/schemas"

import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"

export type RegisterStatusType = {
    status: number,
    message: string
}
export const register = async (value: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(value)

    // Validate all fields
    if (!validatedFields.success) {
        return {
            status: 1,
            message: "Invalid fields!"
        }
    }

    // Get data
    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    // Exist user in database
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {
            status: 1,
            message: "Email already in used!"
        }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    // TODO: Send verification token email

    return {
        status: 0,
        message: "User created!"
    }
}