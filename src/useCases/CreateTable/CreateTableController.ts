import { CreateTableUseCase } from "./CreateTableUseCase";
import { Request, Response } from "express";

export class CreateTableController {
  constructor(
    private createTableUseCase: CreateTableUseCase
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
    
    const { name, capacity } = request.body;
    
    await this.createTableUseCase.execute({
      name,
      capacity
    });
    
    return response.status(201).send();
  }
}