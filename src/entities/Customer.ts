import { randomUUID } from "crypto";
import { hash } from "@/libs/bcrypt";

export class Customer {
  public readonly id: string;
  
  public name: string;
  public email: string;
  public password: string;
  public role: "customer" | "admin";
  
  constructor(props: Omit<Customer, "id">, id?: string) {
    Object.assign(this, props);
    
    this.id = id ?? randomUUID();
    this.password = hash(this.password);
  }
}