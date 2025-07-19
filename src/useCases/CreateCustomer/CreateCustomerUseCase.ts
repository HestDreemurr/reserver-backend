import { ICustomersRepository } from "@/repositories/ICustomersRepository";
import { ICreateCustomerRequestDTO, ICreateCustomerResponseDTO } from "./CreateCustomerDTO";
import { Customer } from "@/entities/Customer";
import { AppError } from "@/app-error";
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
      role: "admin"
    });
    
    if (!success) {
      throw new AppError(error.issues[0].message);
    }
    
    const customer = new Customer(data);
    
    const customerAlreadyExists = await this.customersRepository.findByEmail(customer.email);
    
    if (customerAlreadyExists) {
      throw new AppError("The customer already exists.");
    }
    
    await this.customersRepository.save(customer);
    
    const token = sign({
      id: customer.id,
      role: customer.role
    });
    
    return { token };
  }
}