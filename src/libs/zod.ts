import z from "zod";



export const CustomerSchema = z.object({
  id: z.string()
    .uuid(),
  
  name: z.string({ error: (iss) => iss.input === undefined ? "The name field is missing." : "Invalid name." })
    .min(3, "The name must be at least 3 characters long."),
  
  email: z.string({ error: (iss) => iss.input === undefined ? "The email field is missing" : "Invalid email." })
    .email("Invalid email."),
  
  password: z.string({ error: (iss) => iss.input === undefined ? "The password field is missing." : "Invalid password." })
    .min(6, "The password must be at least 6 characters long."),
  
  role: z.literal(["customer", "admin"])
});