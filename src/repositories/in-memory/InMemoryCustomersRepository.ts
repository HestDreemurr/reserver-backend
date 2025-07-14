import { ICustomersRepository } from "../ICustomersRepository";
import { Customer } from "@/entities/Customer";

export class InMemoryCustomersRepository implements ICustomersRepository {
  public customers: Customer[] = [];
  
  async findByEmail(email: string): Promise<Customer | undefined> {
    const data = this.customers.find(customer => customer.email === email);
    
    return data;
  }
  
  async save(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }
}