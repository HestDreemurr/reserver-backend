import { ITablesRepository } from "@/repositories/ITablesRepository";
import { IUpdateTableRequestDTO } from "./UpdateTableDTO";
import { UpdateTableSchema } from "@/libs/zod";
import { AppError } from "@/app-error";

export class UpdateTableUseCase {
  constructor(
    private tablesRepository: ITablesRepository
  ) {}
  
  async execute(request: IUpdateTableRequestDTO) {
    const data = UpdateTableSchema.parse(request.changes);
    
    const existentTable = await this.tablesRepository.findById(request.id);
    
    if (!existentTable) {
      throw new AppError("The table don't exists.", 404);
    }
    
    await this.tablesRepository.update(request.id, data);
  }
}