import { describe, test, expect } from "vitest";
import { InMemoryTablesRepository } from "@/repositories/in-memory/InMemoryTablesRepository";
import { DeleteTableUseCase } from "./DeleteTableUseCase";
import { Table } from "@/entities/Table";

describe("Delete Table", async () => {
  const inMemoryTablesRepository = new InMemoryTablesRepository();
  
  const table = new Table({
    name: "Forsaken",
    capacity: 4
  });
  
  await inMemoryTablesRepository.save(table);
  
  const deleteTableUseCase = new DeleteTableUseCase(inMemoryTablesRepository);
  
  test("successfully delete an table", async () => {
    await expect(deleteTableUseCase.execute({ id: table.id })).resolves.toBeUndefined();
  });
  
  test("should not be able to delete an inexistent table", async () => {
    await expect(deleteTableUseCase.execute({ id: "akajKaowk" })).rejects.toThrow("The table don't exists.");
  });
});