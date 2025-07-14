import { Customer } from "@/entities/Customer";

export interface ICustomersRepository {
  findByEmail(email: string): Promise<Customer | undefined>;
  save(customer: Customer): Promise<void>;
}