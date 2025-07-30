import { Reserve } from "@/entities/Reserve";
import { IReservesRepository } from "../IReservesRepository";
import { prisma } from "@/lib/prisma";

const ONE_HOUR = 1000 * 60 * 60;

export class PrismaReservesRepository implements IReservesRepository {
  async save(reserve: Reserve): Promise<void> {
    await prisma.reserve.create({ data: reserve });
  }
  
  async findOverlappingReserve(
    tableId: string,
    date: Date
  ): Promise<Reserve> {
    const overlappingReserves = await prisma.reserve.findMany({
      where: {
        tableId
      }
    });
    
    return overlappingReserves.find(reserve =>
      date.getTime() >= reserve.date.getTime() && date.getTime() <= reserve.date.getTime() + ONE_HOUR
    );
  }
}