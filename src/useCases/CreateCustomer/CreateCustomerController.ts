import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { Request, Response } from "express";

export class CreateCustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase
  ) {}
  
  async handle(request: Request, response: Response) {
    if (!request.body) {
      return response.status(400).json({
        message: "The request body is missing."
      });
    }
    
    const { name, email, password } = request.body;
    
    const result = await this.createCustomerUseCase.execute({
        name,
        email,
        password
      });
      
    return response.status(201).json(result);
  }
}