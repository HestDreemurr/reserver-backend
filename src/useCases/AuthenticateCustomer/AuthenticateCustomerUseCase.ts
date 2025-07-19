import { ICustomersRepository } from "@/repositories/ICustomersRepository";
import { IAuthenticateCustomerRequestDTO, IAuthenticateCustomerResponseDTO } from "./AuthenticateCustomerDTO";
import { AuthCustomerSchema } from "@/libs/zod";
import { AppError } from "@/app-error";
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
      throw new AppError(error.issues[0].message);
    }
    
    const customer = await this.customersRepository.findByEmail(email);
    
    if (!customer) {
      throw new AppError("The customer don't exists.", 404);
    }
    
    const isValidPassword = await compare(password, customer.password);
    
    if (!isValidPassword) {
      throw new Error("Invalid credentials.", 401);
    }
    
    const token = sign({
      id: customer.id,
      role: customer.role
    });
    
    return { token };
  }
}