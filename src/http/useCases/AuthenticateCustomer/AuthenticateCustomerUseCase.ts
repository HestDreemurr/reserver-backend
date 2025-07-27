import { ICustomersRepository } from "@/repositories/ICustomersRepository";
import { IAuthenticateCustomerRequestDTO, IAuthenticateCustomerResponseDTO } from "./AuthenticateCustomerDTO";
import { AuthCustomerSchema } from "@/lib/schemas";
import { AppError } from "@/http/app-error";
import { compare } from "bcryptjs";
import { sign } from "@/lib/jwt";

export class AuthenticateCustomerUseCase {
  constructor(
    private customersRepository: ICustomersRepository
  ) {}
  
  async execute(request: IAuthenticateCustomerRequestDTO): IAuthenticateCustomerResponseDTO {
    const data = AuthCustomerSchema.parse(request);
    
    const customer = await this.customersRepository.findByEmail(data.email);
    
    if (!customer) {
      throw new AppError("The customer don't exists.", 404);
    }
    
    const isValidPassword = await compare(data.password, customer.password);
    
    if (!isValidPassword) {
      throw new AppError("Invalid credentials.", 401);
    }
    
    const token = sign({
      id: customer.id,
      role: customer.role
    });
    
    return { token };
  }
}