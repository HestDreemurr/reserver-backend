import { ITablesRepository } from "@/repositories/ITablesRepository";
import { IDeleteTableRequestDTO } from "./DeleteTableDTO";
import { AppError } from "@/http/app-error";

export class DeleteTableUseCase {
  constructor(
    private tablesRepository: ITablesRepository
  ) {}
  
  async execute({
    id
  }: IDeleteTableRequestDTO) {
    const existentTable = await this.tablesRepository.findById(id);
    
    if (!existentTable) {
      throw new AppError("The table don't exists.");
    }
    
    await this.tablesRepository.delete(id);
  }
}