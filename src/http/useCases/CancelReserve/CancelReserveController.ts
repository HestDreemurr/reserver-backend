import { CancelReserveUseCase } from "./CancelReserveUseCase";
import { Request, Response } from "express";

export class CancelReserveController {
  constructor(
    private cancelReserveUseCase: CancelReserveUseCase
  ) {}
  
  async handle(
    request: Request,
    response: Response
  ) {
    const reserveId = request.params.id;
    const customerId = request.user.id;
    
    await this.cancelReserveUseCase.execute({
      reserveId,
      customerId
    });
    
    return response.status(204).send();
  }
}