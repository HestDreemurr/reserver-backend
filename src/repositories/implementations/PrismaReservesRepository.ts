import { Reserve } from "@/entities/Reserve";
import { IReservesRepository } from "../IReservesRepository";
import { prisma } from "@/lib/prisma";

const ONE_HOUR = 1000 * 60 * 60;

export class PrismaReservesRepository implements IReservesRepository {
  async save(reserve: Reserve): Promise<void> {
    await prisma.reserve.create({ data: reserve });
    
    await prisma.table.update({
      data: { status: "RESERVED" },
      where: {
        id: reserve.tableId
      }
    });
  }
  
  async cancel(reserveId: string): Promise<void> {
    await prisma.reserve.update({
      data: { status: "CANCELED" },
      where: { id: reserveId }
    });
  }
  
  async findById(reserveId: string): Promise<Reserve> {
    const data = await prisma.reserve.findUnique({
      where: { id: reserveId }
    });
    
    return data
  }
  
  async findOverlappingReserve(
    tableId: string,
    date: Date
  ): Promise<Reserve> {
    const overlappingReserves = await prisma.reserve.findMany({
      where: {
        tableId,
        NOT: { status: "CANCELED" }
      }
    });
    
    return overlappingReserves.find(reserve =>
      date.getTime() >= reserve.date.getTime() && date.getTime() <= reserve.date.getTime() + ONE_HOUR
    );
  }
  
  async list(customerId: string): Promise<Reserve[]> {
    const data = await prisma.reserve.findMany({
      where: { customerId }
    });
    
    return data;
  }
}