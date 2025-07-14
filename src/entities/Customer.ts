import { randomUUID } from "crypto";
import { CustomerSchema } from "@/libs/zod";
import { hash } from "@/libs/bcrypt";

export class Customer {
  public readonly id: string;
  
  public name: string;
  public email: string;
  public password: string;
  public role: "customer" | "admin";
  
  constructor(props: Omit<Customer, "id">, id?: string) {
    this.id = id ?? randomUUID();
    
    Object.assign(this, props);
    
    const { success, error } = CustomerSchema.safeParse(this);
    
    if (!success) {
      throw new Error(error.issues[0].message);
    }
    
    this.password = hash(this.password);
  }
}