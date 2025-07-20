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
  
  async update(id: string, changes: Partial<Table>) {
    this.tables.forEach(table => {
      if (table.id === id) {
        Object.assign(table, changes);
      }
    });
  }
}