import { describe, test, expect } from "vitest";
import { Customer } from "./Customer";

describe("Customer Entity", () => {
  test("create a customer entity", () => {
    const customer = new Customer({
      name: "Hest",
      email: "hest@gmail.com",
      password: "hest1234",
      role: "customer"
    });
    
    expect(customer).toBeInstanceOf(Customer);
    console.log(`Customer object: ${JSON.stringify(customer, null, 2)}`);
  });
  
  test("should not be able to create a invalid customer entity", () => {
    expect(() => new Customer({
      name: "Me",
      email: "invalidemail",
      password: "12345",
      role: "unknown"
    })).toThrow();
  });
});