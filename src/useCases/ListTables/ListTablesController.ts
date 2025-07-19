import { ListTablesUseCase } from "./ListTablesUseCase";
import { Request, Response } from "express";

export class ListTablesController {
  constructor(
    private listTablesUseCase: ListTablesUseCase
  ) {}
  
  async handle(
    request: Request,
    response: Response
  ) {
    const result = await this.listTablesUseCase.execute();
    
    return response.status(200).json(result);
  }
}