import { Reserve } from "@/entities/Reserve";
import { IReservesRepository } from "../IReservesRepository";

const ONE_HOUR = 1000 * 60 * 60;

export class InMemoryReservesRepository implements IReservesRepository {
  public reserves: Reserve[] = [];
  
  async save(reserve: Reserve): Promise<void> {
    this.reserves.push(reserve);
  }
  
  async cancel(reserveId: string): Promise<void> {
    this.reserves.forEach(reserve => {
      if (reserve.id === reserveId) reserve.status = "CANCELED";
    });
  }
  
  async findById(reserveId: string): Promise<Reserve> {
    const data = this.reserves.find(reserve => reserve.id === reserveId);
    return data;
  }
  
  async findOverlappingReserve(
    tableId: string,
    date: Date
  ): Promise<Reserve> {
    const overlappingReserve = this.reserves.find(
      reserve => reserve.tableId === tableId && reserve.status !== "CANCELED" && (date.getTime() >= reserve.date.getTime() && date.getTime() <= reserve.date.getTime() + ONE_HOUR)
    );
    
    return overlappingReserve;
  }
  
  async list(customerId: string): Promise<Reserve[]> {
    const data = this.reserves.filter(reserve => reserve.customerId === customerId);
    
    return data;
  }
}