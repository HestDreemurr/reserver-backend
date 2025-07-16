import { ICustomersRepository } from "@/repositories/ICustomersRepository";
import { IAuthenticateCustomerRequestDTO, IAuthenticateCustomerResponseDTO } from "./AuthenticateCustomerDTO";
import { AuthCustomerSchema } from "@/libs/zod";
import { compare } from "bcryptjs";
import { sign } from "@/libs/jwt";

export class AuthenticateCustomerUseCase {
  constructor(
    private customersRepository: ICustomersRepository
  ) {}
  
  async execute({
    email,
    password
  }: IAuthenticateCustomerRequestDTO): IAuthenticateCustomerResponseDTO {
    const { success, error } = AuthCustomerSchema.safeParse({
      email,
      password
    });
    
    if (!success) {
      throw new Error(error.issues[0].message);
    }
    
    const customer = await this.customersRepository.findByEmail(email);
    
    if (!customer) {
      throw new Error("The customer don't exists.");
    }
    
    const isValidPassword = await compare(password, customer.password);
    
    if (!isValidPassword) {
      throw new Error("Invalid credentials.");
    }
    
    const token = sign(customer.id);
    return { token };
  }
}