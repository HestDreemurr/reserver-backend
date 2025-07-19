import { Table } from "@/entities/Table";
import { ITablesRepository } from "../ITablesRepository";

export class InMemoryTablesRepository implements ITablesRepository {
  public tables: Table[] = [];
  
  async save(table: Table): Promise<void> {
    this.tables.push(table);
  }
  
  async list(): Promise<Table[]> {
    return this.tables;
  }
}