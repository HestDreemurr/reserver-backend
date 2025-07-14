import { Customers } from "#sequelize";
import { ICustomersRepository } from "../ICustomersRepository";
import { Customer } from "@/entities/Customer";

export class SequelizeCustomersRepository implements ICustomersRepository {
  async findByEmail(email: string): Promise<Customer> {
    const data = await Customers.findOne({
      where: {
        email
      }
    });
    
    return data;
  }
  
  async save(customer: Customer): Promise<void> {
    await Customers.create(customer);
  }
}