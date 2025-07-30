import z from "zod";

const emailSchema = z.string({ error: (iss) => iss.input === undefined ? "The email field is missing." : "Invalid email" })
  .email("Invalid email.");
  
const passwordSchema = z.string({ error: (iss) => iss.input === undefined ? "The password field is missing." : "Invalid password" })
  .min(6, "The password must be at least 6 characters long.");
  
const requiredBodyError = "The request body is missing.";

export const CustomerSchema = z.object({
  name: z.string({ error: (iss) => iss.input === undefined ? "The name field is missing." : "Invalid name." })
    .min(3, "The name must be at least 3 characters long."),
  email: emailSchema,
  password: passwordSchema,
}, requiredBodyError);

export const AuthCustomerSchema = z.object({
  email: emailSchema,
  password: passwordSchema
}, requiredBodyError);

export const TableSchema = z.object({
  name: z.string({ error: (iss) => iss.input === undefined ? "The name field is missing." : "Invalid name." }),
  
  capacity: z.number({ error: (iss) => iss.input === undefined ? "The capacity field is missing" : "Invalid capacity." })
    .min(1, "The capacity must be a number between 1 and 10.")
    .max(10, "The capacity must be a number between 1 and 10.")
}, requiredBodyError);

export const UpdateTableSchema = TableSchema.extend({
  status: z.literal(["AVAILABLE", "RESERVED", "INACTIVE"], "Invalid table status.")
}).partial();

export const ReserveSchema = z.object({
  customerId: z.string()
    .uuid("Invalid customer ID."),
    
  tableId: z.string()
    .uuid("Invalid table ID."),
  
  date: z.iso.datetime({ local: true, error: "Invalid date." })
});