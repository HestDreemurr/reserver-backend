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
    const data = request.body;
    
    await this.createTableUseCase.execute(data);
    
    return response.status(201).send();
  }
}