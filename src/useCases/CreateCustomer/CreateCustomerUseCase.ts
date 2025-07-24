import { ICustomersRepository } from "@/repositories/ICustomersRepository";
import { ICreateCustomerRequestDTO, ICreateCustomerResponseDTO } from "./CreateCustomerDTO";
import { Customer } from "@/entities/Customer";
import { CustomerSchema } from "@/libs/zod";
import { AppError } from "@/app-error";
import { sign } from "@/libs/jwt";

export class CreateCustomerUseCase {
  constructor(
    private customersRepository: ICustomersRepository
  ) {}
  
  async execute(request: ICreateCustomerRequestDTO): ICreateCustomerResponseDTO {
    const data = CustomerSchema.parse(request);
    
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