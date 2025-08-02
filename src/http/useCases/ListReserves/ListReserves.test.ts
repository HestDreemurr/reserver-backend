import { describe, expect, test } from "vitest";
import { InMemoryReservesRepository } from "@/repositories/in-memory/InMemoryReservesRepository";
import { ListReservesUseCase } from "./ListReservesUseCase";
import { Reserve } from "@/entities/Reserve";

describe("List Reserves", async () => {
  const inMemoryReservesRepository = new InMemoryReservesRepository();
  
  const reserves = [
    new Reserve({
      customerId: "b7ffb90e-b942-41bf-a5a1-c894d06d8855",
      tableId: "ba0d8468-3e26-4b83-b46c-27daa447248a",
      date: "2025-10-10T20:00"
    }),
    new Reserve({
      customerId: "b7ffb90e-b942-41bf-a5a1-c894d06d8855",
      tableId: "ba0d8468-3e26-4b83-b46c-27daa447248a",
      date: "2025-10-10T21:30"
    }),
    new Reserve({
      customerId: "b7ffb90e-b942-41bf-a5a1-c894d06d8855",
      tableId: "ba0d8468-3e26-4b83-b46c-27daa447248a",
      date: "2025-10-10T23:30"
    })
  ];
  
  await inMemoryReservesRepository.save(reserves[0]);
  await inMemoryReservesRepository.save(reserves[1]);
  await inMemoryReservesRepository.save(reserves[2]);
  
  const listReservesUseCase = new ListReservesUseCase(inMemoryReservesRepository);
  
  test("sucessfully list reserves", async () => {
    await expect(listReservesUseCase.execute({ customerId: "b7ffb90e-b942-41bf-a5a1-c894d06d8855" })).resolves.toEqual(reserves);
  });
});