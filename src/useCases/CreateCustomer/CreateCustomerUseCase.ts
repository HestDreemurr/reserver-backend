import { ICustomersRepository } from "@/repositories/ICustomersRepository";
import { ICreateCustomerRequestDTO, ICreateCustomerResponseDTO } from "./CreateCustomerDTO";
import { Customer } from "@/entities/Customer";
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
    const customer = new Customer({
      name,
      email,
      password,
      role: "customer"
    });
    
    const customerAlreadyExists = await this.customersRepository.findByEmail(customer.email);
    
    if (customerAlreadyExists) {
      throw new Error("The customer already exists.");
    }
    
    await this.customersRepository.save(customer);
    
    const token = sign(customer.id);
    return { token };
  }
}