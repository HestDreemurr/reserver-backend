import { describe, test, expect } from "vitest";
import { InMemoryTablesRepository } from "@/repositories/in-memory/InMemoryTablesRepository";
import { ListTablesUseCase } from "./ListTablesUseCase";
import { Table } from "@/entities/Table";

describe("List Tables", async () => {
  const inMemoryTablesRepository = new InMemoryTablesRepository();
  
  const tables = [
    new Table({
      name: "1",
      capacity: 2,
      status: "available"
    }),
    new Table({
      name: "2",
      capacity: 3,
      status: "reserved"
    })
  ];
  
  await inMemoryTablesRepository.save(tables[0]);
  await inMemoryTablesRepository.save(tables[1]);
  
  const listTablesUseCase = new ListTablesUseCase(inMemoryTablesRepository);
  
  test("list all tables", async () => {
    await expect(listTablesUseCase.execute()).resolves.toEqual({ data: tables });
  });
});