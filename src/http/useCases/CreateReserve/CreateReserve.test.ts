import { describe, expect, test } from "vitest";
import { InMemoryTablesRepository } from "@/repositories/in-memory/InMemoryTablesRepository";
import { InMemoryReservesRepository } from "@/repositories/in-memory/InMemoryReservesRepository";
import { CreateReserveUseCase } from "./CreateReserveUseCase";
import { Table } from "@/entities/Table";
import { Customer } from "@/entities/Customer";
import { randomUUID } from "crypto";

describe("Create Reserve", async () => {
  const inMemoryTablesRepository = new InMemoryTablesRepository();
  
  const table = new Table({
    name: "Teste",
    capacity: 3,
    status: "AVAILABLE"
  });
  
  const customer = new Customer({
    name: "Hest",
    email: "hest@gmail.com",
    password: "hestlindo123"
  });
  
  await inMemoryTablesRepository.save(table);
  
  const inMemoryReservesRepository = new InMemoryReservesRepository();
  
  const createReserveUseCase = new CreateReserveUseCase(
    inMemoryReservesRepository,
    inMemoryTablesRepository
  );
  
  test("successfully create an reserve", async () => {
    await expect(createReserveUseCase.execute({
      customerId: customer.id,
      tableId: table.id,
      date: "2025-10-10T20:00"
    })).resolves.toBeUndefined();
    
    await expect(createReserveUseCase.execute({
      customerId: customer.id,
      tableId: table.id,
      date: "2025-10-10T22:00"
    })).resolves.toBeUndefined();
  });
  
  test("should not be able to create an table with invalid data", async () => {
    await expect(createReserveUseCase.execute({
      customerId: "auahaa-ksksjw",
      tableId: table.id,
      date: "2025-10-10T20:00"
    })).rejects.toThrow("Invalid customer ID.");
    
    await expect(createReserveUseCase.execute({
      customerId: customer.id,
      tableId: "ahq7ababy",
      date: "2025-10-10T20:00"
    })).rejects.toThrow("Invalid table ID.");
    
    await expect(createReserveUseCase.execute({
      customerId: customer.id,
      tableId: table.id,
      date: "datesla"
    })).rejects.toThrow("Invalid date.");
  });
  
  test("should not be able to create an reserve for an inexistent table", async () => {
    await expect(createReserveUseCase.execute({
      customerId: customer.id,
      tableId: randomUUID(),
      date: "2025-10-10T20:00"
    })).rejects.toThrow("The table don't exists.");
  });
  
  test("should not be able to create an overlapping reserve", async () => {
    await expect(createReserveUseCase.execute({
      customerId: customer.id,
      tableId: table.id,
      date: "2025-10-10T20:00"
    })).rejects.toThrow("There's an overlapping reserve on this table.");
    
    await expect(createReserveUseCase.execute({
      customerId: customer.id,
      tableId: table.id,
      date: "2025-10-10T20:30"
    })).rejects.toThrow("There's an overlapping reserve on this table.");
  });
});