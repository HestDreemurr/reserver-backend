import { Customer } from "@/entities/Customer";
import { ICustomersRepository } from "../ICustomersRepository";
import { prisma } from "@/lib/prisma";

export class PrismaCustomersRepository implements ICustomersRepository {
  async findByEmail(email: string): Promise<Customer | undefined> {
    const data = await prisma.customer.findUnique({
      where: {
        email
      }
    });
    
    return data;
  }
  
  async save(customer: Customer): Promise<void> {
    await prisma.customer.create({ data: customer });
  }
}