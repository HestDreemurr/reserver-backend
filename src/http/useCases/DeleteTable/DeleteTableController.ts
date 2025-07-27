import { DeleteTableUseCase } from "./DeleteTableUseCase";
import { Request, Response } from "express";

export class DeleteTableController {
  constructor(
    private deleteTableUseCase: DeleteTableUseCase
  ) {}
  
  async handle(
    request: Request,
    response: Response
  ) {
    const id = request.params.id;
    
    await this.deleteTableUseCase.execute({ id });
    
    return response.status(204).send();
  }
}