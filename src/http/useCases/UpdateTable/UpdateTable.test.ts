import { describe, test, expect } from "vitest";
import { UpdateTableUseCase } from "./UpdateTableUseCase";
import { InMemoryTablesRepository } from "@/repositories/in-memory/InMemoryTablesRepository";
import { Table } from "@/entities/Table";

describe("Update Table", async () => {
  const inMemoryTablesRepository = new InMemoryTablesRepository();
  
  const table = new Table({
    name: "Jacy",
    capacity: 9,
    status: "AVAILABLE"
  });
  
  await inMemoryTablesRepository.save(table);
  
  const updateTableUseCase = new UpdateTableUseCase(inMemoryTablesRepository);
  
  test("successfully update a table", async () => {
    await expect(updateTableUseCase.execute({
      id: table.id,
      changes: { status: "AVAILABLE" }
    })).resolves.toBeUndefined();
  });
  
  test("should not be able to update an inexistent table", async () => {
    await expect(updateTableUseCase.execute({
      id: "aishanajaj",
      changes: { name: "Jacy có" }
    })).rejects.toThrow("The table don't exists.");
  });
  
  test("should not be able to update an table with invalid data", async () => {
    await expect(updateTableUseCase.execute({
      id: table.id,
      changes: { status: "slasla" }
    })).rejects.toThrow("Invalid table status.");
    
    await expect(updateTableUseCase.execute({
      id: table.id,
      changes: { capacity: 11 }
    })).rejects.toThrow("The capacity must be a number between 1 and 10.");
    
    await expect(updateTableUseCase.execute({
      id: table.id,
      changes: undefined
    })).rejects.toThrow("The request body is missing.");
  });
});