import { describe, test, expect } from "vitest";
import { InMemoryCustomersRepository } from "@/repositories/in-memory/InMemoryCustomersRepository";
import { AuthenticateCustomerUseCase } from "./AuthenticateCustomerUseCase";
import { Customer } from "@/entities/Customer";

describe("Authenticate User", () => {
  const inMemoryCustomersRepository = new InMemoryCustomersRepository();
  
  const customer = new Customer({
    name: "Hest",
    email: "hest@gmail.com",
    password: "hest123",
    role: "customer"
  });
  
  inMemoryCustomersRepository.save(customer);
  
  const authenticateCustomerUseCase = new AuthenticateCustomerUseCase(inMemoryCustomersRepository);
  
  test("successfully authenticate a customer", async () => {
    await expect(authenticateCustomerUseCase.execute({
      email: "hest@gmail.com",
      password: "hest123"
    })).resolves.toHaveProperty("token");
  });
  
  test("should not be able to authenticate a inexistent customer", async () => {
    await expect(authenticateCustomerUseCase.execute({
      email: "inexistent@gmail.com",
      password: "bleu1234"
    })).rejects.toThrow("The customer don't exists.");
  });
  
  test("should not be able to authenticate customer with a invalid password", async () => {
    await expect(authenticateCustomerUseCase.execute({
      email: "hest@gmail.com",
      password: "blabla"
    })).rejects.toThrow("Invalid credentials.");
  });
  
  test("should not be able to authenticate a customer with invalid credentials", async () => {
    await expect(authenticateCustomerUseCase.execute({
      email: "sla@gmail.com"
    })).rejects.toThrow("The password field is missing.");
    
    await expect(authenticateCustomerUseCase.execute({
      email: "slasla"
    })).rejects.toThrow("Invalid email.");
  });
});