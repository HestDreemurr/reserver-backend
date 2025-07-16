import z from "zod";

const emailSchema = z.string({ error: (iss) => iss.input === undefined ? "The email field is missing." : "Invalid email" })
  .email("Invalid email.");
  
const passwordSchema = z.string({ error: (iss) => iss.input === undefined ? "The password field is missing." : "Invalid password" })
  .min(6, "The password must be at least 6 characters long.");

export const CustomerSchema = z.object({
  name: z.string({ error: (iss) => iss.input === undefined ? "The name field is missing." : "Invalid name." })
    .min(3, "The name must be at least 3 characters long."),
  email: emailSchema,
  password: passwordSchema,
  role: z.literal(["customer", "admin"])
});

export const AuthCustomerSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});