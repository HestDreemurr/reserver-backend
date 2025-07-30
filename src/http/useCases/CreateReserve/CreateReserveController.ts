import { CreateReserveUseCase } from "./CreateReserveUseCase";
import { Request, Response } from "express";

export class CreateReserveController {
  constructor(
    private createReserveUseCase: CreateReserveUseCase
  ) {}
  
  async handle(
    request: Request,
    response: Response
  ) {
    const data = {
      customerId: request.user.id,
      tableId: request.body.tableId,
      date: request.body.date
    };
    
    await this.createReserveUseCase.execute(data);
    
    return response.status(201).send();
  }
}