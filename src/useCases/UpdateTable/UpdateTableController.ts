import { UpdateTableUseCase } from "./UpdateTableUseCase";
import { Request, Response } from "express";

export class UpdateTableController {
  constructor(
    private updateTableUseCase: UpdateTableUseCase
  ) {}
  
  async handle(
    request: Request,
    response: Response
  ) {
    const id = request.params.id;
    const changes = request.body;
    
    await this.updateTableUseCase.execute({
      id,
      changes
    });
    
    return response.status(204).send();
  }
}