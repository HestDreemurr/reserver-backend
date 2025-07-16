import { ICustomersRepository } from "@/repositories/ICustomersRepository";
import { ICreateCustomerRequestDTO, ICreateCustomerResponseDTO } from "./CreateCustomerDTO";
import { Customer } from "@/entities/Customer";
import { CustomerSchema } from "@/libs/zod";
import { sign } from "@/libs/jwt";

export class CreateCustomerUseCase {
  constructor(
    private customersRepository: ICustomersRepository
  ) {}
  
  async execute({
    name,
    email,
    password
  }: ICreateCustomerRequestDTO): ICreateCustomerResponseDTO {
    const { success, error, data } = CustomerSchema.safeParse({
      name,
      email,
      password,
      role: "customer"
    });
    
    if (!success) {
      throw new Error(error.issues[0].message);
    }
    
    const customer = new Customer(data);
    
    const customerAlreadyExists = await this.customersRepository.findByEmail(customer.email);
    
    if (customerAlreadyExists) {
      throw new Error("The customer already exists.");
    }
    
    await this.customersRepository.save(customer);
    
    const token = sign(customer.id);
    return { token };
  }
}