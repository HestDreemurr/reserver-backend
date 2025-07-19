import { describe, test, expect } from "vitest";
import { InMemoryTablesRepository } from "@/repositories/in-memory/InMemoryTablesRepository";
import { CreateTableUseCase } from "./CreateTableUseCase";

describe("Create Table", () => {
  const inMemoryTablesRepository = new InMemoryTablesRepository();
  const createTableUseCase = new CreateTableUseCase(inMemoryTablesRepository);
  
  test("successfully create a table", async () => {
    await expect(createTableUseCase.execute({
      name: "41",
      capacity: 3,
      status: "available"
    })).resolves.toBeUndefined();
  });
  
  test("should not create a table with invalid credentials", async () => {
    await expect(createTableUseCase.execute({
      capacity: 3
    })).rejects.toThrow("The name field is missing.");
    
    await expect(createTableUseCase.execute({
      name: "41",
      capacity: 0,
      status: "available"
    })).rejects.toThrow("The capacity must be a number between 1 and 10.");
    
    await expect(createTableUseCase.execute({
      name: "41",
      capacity: 11,
      status: "available"
    })).rejects.toThrow("The capacity must be a number between 1 and 10.");
  });
});