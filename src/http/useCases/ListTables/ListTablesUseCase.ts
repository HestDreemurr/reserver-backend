import { ITablesRepository } from "@/repositories/ITablesRepository";
import { IListTablesResponseDTO } from "./ListTablesDTO";

export class ListTablesUseCase {
  constructor(
    private tablesRepository: ITablesRepository
  ) {}
  
  async execute(): Promise<IListTablesResponseDTO> {
    const data = await this.tablesRepository.list();
    
    return { data };
  }
}