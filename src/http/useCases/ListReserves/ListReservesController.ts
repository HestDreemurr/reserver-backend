import { ListReservesUseCase } from "./ListReservesUseCase";
import { Request, Response } from "express";

export class ListReservesController {
  constructor(
    private listReservesUseCase: ListReservesUseCase
  ) {}
  
  async handle(
    request: Request,
    response: Response
  ) {
    const customerId = request.user.id;
    
    const result = await this.listReservesUseCase.execute({ customerId });
    
    return response.status(200).json(result);
  }
}