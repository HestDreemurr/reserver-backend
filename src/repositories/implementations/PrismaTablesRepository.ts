import { Table } from "@/entities/Table";
import { ITablesRepository } from "../ITablesRepository";
import { prisma } from "@/lib/prisma";

export class PrismaTablesRepository implements ITablesRepository {
  async save(table: Table): Promise<void> {
    await prisma.table.create({ data: table });
  }
  
  async list(): Promise<Table[]> {
    const data = await prisma.table.findMany();
    
    return data;
  }
  
  async update(id: string, changes: Partial<Table>): Promise<void> {
    await prisma.table.update({
      data: changes,
      where: {
        id
      }
    });
  }
  
  async findById(id: string): Promise<Table> {
    const data = await prisma.table.findUnique({
      where: {
        id
      }
    });
    
    return data;
  }
  
  async delete(id: string): Promise<void> {
    await prisma.table.delete({
      where: {
        id
      }
    });
  }
}