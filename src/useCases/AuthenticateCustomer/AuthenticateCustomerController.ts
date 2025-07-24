import { AuthenticateCustomerUseCase } from "./AuthenticateCustomerUseCase";
import { Request, Response } from "express";
import { AuthCustomerSchema } from "@/libs/zod";

export class AuthenticateCustomerController {
  constructor(
    private authenticateCustomerUseCase: AuthenticateCustomerUseCase
  ) {}
  
  async handle(
    request: Request,
    response: Response
  ) {
    const data = request.body;
    
    const result = await this.authenticateCustomerUseCase.execute(data);
    
    return response.status(200).json(result);
  }
}