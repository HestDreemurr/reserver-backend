import { describe, test, expect } from "vitest";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { InMemoryCustomersRepository } from "@/repositories/in-memory/InMemoryCustomersRepository";

describe("Create Customer", () => {
  const inMemoryCustomersRepository = new InMemoryCustomersRepository();
  const createCustomerUseCase = new CreateCustomerUseCase(inMemoryCustomersRepository);
  
  test("successfully create a user", async () => {
    await expect(createCustomerUseCase.execute({
      name: "Shadow",
      email: "shadow@gmail.com",
      password: "shado123"
    })).resolves.toBeDefined();
  });
  
  test("should not create a user with the same email", async () => {
    await expect(createCustomerUseCase.execute({
      name: "Shadow",
      email: "shadow@gmail.com",
      password: "shadow123"
    })).rejects.toThrow();
  });
});