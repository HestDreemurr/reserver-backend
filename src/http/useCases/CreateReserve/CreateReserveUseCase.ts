import { ITablesRepository } from "@/repositories/ITablesRepository";
import { IReservesRepository } from "@/repositories/IReservesRepository";
import { ICreateReserveRequestDTO } from "./CreateReserveDTO";
import { ReserveSchema } from "@/lib/schemas";
import { Reserve } from "@/entities/Reserve";
import { AppError } from "@/http/app-error";

export class CreateReserveUseCase {
  constructor(
    private reservesRepository: IReservesRepository,
    private tablesRepository: ITablesRepository
  ) {}
  
  async execute(
    request: ICreateReserveRequestDTO
  ) {
    const data = ReserveSchema.parse(request);
    
    const reserve = new Reserve(data);
    
    const table = await this.tablesRepository.findById(reserve.tableId);
    
    if (!table) {
      throw new AppError("The table don't exists.");
    }
    
    const overlappingReserve = await this.reservesRepository.findOverlappingReserve(reserve.tableId, reserve.date);
    
    if (overlappingReserve) {
      throw new AppError("There's an overlapping reserve on this table.");
    }
    
    await this.reservesRepository.save(reserve);
  }
}