import { describe, test, expect } from "vitest";
import { InMemoryReservesRepository } from "@/repositories/in-memory/InMemoryReservesRepository";
import { CancelReserveUseCase } from "./CancelReserveUseCase";
import { Reserve } from "@/entities/Reserve";

describe("Cancel Reserve", async () => {
  const inMemoryReservesRepository = new InMemoryReservesRepository();
  
  const reserve = new Reserve({
    customerId: "b6c1783a-32c4-401e-8867-9cd6def8abbf",
    tableId: "b7ffb90e-b942-41bf-a5a1-c894d06d8855",
    date: "2025-10-10T20:00"
  });
  
  await inMemoryReservesRepository.save(reserve);
  
  const cancelReserveUseCase = new CancelReserveUseCase(inMemoryReservesRepository);
  
  test("successfully cancel an reserve", async () => {
    await expect(cancelReserveUseCase.execute({
      reserveId: reserve.id,
      customerId: reserve.customerId
    })).resolves.toBeUndefined();
    expect(inMemoryReservesRepository.reserves[0].status).toBe("CANCELED");
  });
  
  test("should not be able to cancel an inexistent reserve", async () => {
    await expect(cancelReserveUseCase.execute({ reserveId: "kajaajaj", customerId: "iahanaa" })).rejects.toThrow("This reserve don't exists.");
  });
  
  test("only the reserve owner should be able to cancel it", async () => {
    await expect(cancelReserveUseCase.execute({
      reserveId: reserve.id,
      customerId: "wkaajaa"
    })).rejects.toThrow("Only the reserve owner can cancel it.");
  });
});