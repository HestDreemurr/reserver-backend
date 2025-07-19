import { Table } from "@/entities/Table";
import { ITablesRepository } from "../ITablesRepository";
import { Tables } from "#sequelize";

export class SequelizeTablesRepository implements ITablesRepository {
  async save(table: Table): Promise<void> {
    await Tables.create(table);
  }
  
  async list(): Promise<Table[]> {
    const data = Tables.findAll();
    return data;
  }
}