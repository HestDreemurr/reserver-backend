import { Table } from "@/entities/Table";

export interface ITablesRepository {
  save(table: Table): Promise<void>;
  list(): Promise<Table[]>;
  update(id: string, changes: Partial<Table>): Promise<void>;
}