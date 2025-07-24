import { ITablesRepository } from "@/repositories/ITablesRepository";
import { ICreateTableRequestDTO } from "./CreateTableDTO";
import { Table } from "@/entities/Table";
import { TableSchema } from "@/libs/zod";
import { AppError } from "@/app-error";

export class CreateTableUseCase {
  constructor(
    private tablesRepository: ITablesRepository
  ) {}
  
  async execute(request: ICreateTableRequestDTO) {
    const data = TableSchema.parse(request);
    
    const table = new Table(data);
    
    await this.tablesRepository.save(table);
  }
}