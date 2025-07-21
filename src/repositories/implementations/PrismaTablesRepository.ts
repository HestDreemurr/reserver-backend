import { Table } from "@/entities/Table";
import { ITablesRepository } from "../ITablesRepository";
import { prisma } from "./prisma";

export class PrismaTablesRepository implements ITablesRepository {
  async save(table: Table): Promise<void> {
    await prisma.table.create({ data: table });
  }
  
  async list(): Promise<Table[]> {
    const data = await prisma.table.findMany();
    
    return data;
  }
}