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
  
  test("should not create a user with invalid credentials", async () => {
    await expect(createCustomerUseCase.execute({
      email: "blabla@gmail.com",
      password: "bleble123"
    })).rejects.toThrow("The name field is missing.");
    
    await expect(createCustomerUseCase.execute({
      name: 123
    })).rejects.toThrow("Invalid name.");
    
    await expect(createCustomerUseCase.execute({
      name: "He"
    })).rejects.toThrow("The name must be at least 3 characters long.");
    
    await expect(createCustomerUseCase.execute({
      name: "Hest",
      email: "hestbut"
    })).rejects.toThrow("Invalid email.");
    
    await expect(createCustomerUseCase.execute({
      name: "Hest",
      email: "hest@gmail.com",
      password: "123"
    })).rejects.toThrow("The password must be at least 6 characters long.");
  });
});