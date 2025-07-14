import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { Request, Response } from "express";

export class CreateCustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase
  ) {}
  
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;
    
    try {
      const result = await this.createCustomerUseCase.execute({
        name,
        email,
        password
      });
      
      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json({
        message: err.message ?? "Erro inesperado"
      });
    }
  }
}