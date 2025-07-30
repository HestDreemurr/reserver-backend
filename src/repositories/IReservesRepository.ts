import { Reserve } from "@/entities/Reserve";

export interface IReservesRepository {
  save(reserve: Reserve): Promise<void>;
  findOverlappingReserve(
    tableId: string,
    date: Date
  ): Promise<Reserve>;
}