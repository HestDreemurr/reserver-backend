import { ITablesRepository } from "@/repositories/ITablesRepository";
import { ICreateTableRequestDTO } from "./CreateTableDTO";
import { Table } from "@/entities/Table";
import { TableSchema } from "@/libs/zod";
import { AppError } from "@/app-error";

export class CreateTableUseCase {
  constructor(
    private tablesRepository: ITablesRepository
  ) {}
  
  async execute({
    name,
    capacity
  }: ICreateTableRequestDTO) {
    const { data, success, error } = TableSchema.safeParse({
      name,
      capacity,
      status: "available"
    });
    
    if (!success) {
      throw new AppError(error.issues[0].message);
    }
    
    const table = new Table(data);
    
    await this.tablesRepository.save(table);
  }
}