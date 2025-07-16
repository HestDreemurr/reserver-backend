import { AuthenticateCustomerUseCase } from "./AuthenticateCustomerUseCase";
import { Request, Response } from "express";

export class AuthenticateCustomerController {
  constructor(
    private authenticateCustomerUseCase: AuthenticateCustomerUseCase
  ) {}
  
  async handle(
    request: Request,
    response: Response
  ) {
    const { email, password } = request.body;
    
    try {
      const result = await this.authenticateCustomerUseCase.execute({
        email,
        password
      });
      
      return response.status(200).json(result);
    } catch (err) {
      return response.status(400).json({
        message: err.message ?? "Erro inesperado."
      });
    }
  }
}