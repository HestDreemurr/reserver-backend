import { Reserve } from "@/entities/Reserve";
import { IReservesRepository } from "../IReservesRepository";

const ONE_HOUR = 1000 * 60 * 60;

export class InMemoryReservesRepository implements IReservesRepository {
  public reserves: Reserve[] = [];
  
  async save(reserve: Reserve): Promise<void> {
    this.reserves.push(reserve);
  }
  
  async findOverlappingReserve(
    tableId: string,
    date: Date
  ): Promise<Reserve> {
    const overlappingReserve = this.reserves.find(
      reserve => reserve.tableId === tableId && (date.getTime() >= reserve.date.getTime() && date.getTime() <= reserve.date.getTime() + ONE_HOUR)
    );
    
    return overlappingReserve;
  }
}