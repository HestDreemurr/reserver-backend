import { Reserve } from "@/entities/Reserve";

export interface IReservesRepository {
  save(reserve: Reserve): Promise<void>;
  cancel(reserveId: string): Promise<void>;
  findById(reserveId: string): Promise<Reserve>;
  findOverlappingReserve(
    tableId: string,
    date: Date
  ): Promise<Reserve>;
  list(customerId: string): Promise<Reserve[]>;
}