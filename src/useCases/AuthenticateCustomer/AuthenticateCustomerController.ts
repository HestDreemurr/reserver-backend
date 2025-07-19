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
    if (!request.body) {
      return response.status(400).json({
        message: "The request body is missing."
      });
    }
    
    const { email, password } = request.body;
    
    const result = await this.authenticateCustomerUseCase.execute({
      email,
      password
    });
    
    return response.status(200).json(result);
  }
}