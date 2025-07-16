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
    expect(customer.name).toBe("Hest");
  });
});