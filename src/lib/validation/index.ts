import { z } from "zod"


export const SignupValidation = z.object({
  name:z.string().min(2, { message: "Name must be at least 2 characters." }), 
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
})

export const SigninValidation = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
})

export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Caption must be atleast five charcters" }).max(2000),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100).optional(),
  tags: z.string().optional()
})
