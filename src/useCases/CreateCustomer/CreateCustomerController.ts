import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { Request, Response } from "express";

export class CreateCustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase
  ) {}
  
  async handle(request: Request, response: Response) {
    const data = request.body;
    
    const result = await this.createCustomerUseCase.execute(data);
      
    return response.status(201).json(result);
  }
}