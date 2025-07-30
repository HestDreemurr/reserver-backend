import { describe, test, expect } from "vitest";
import { Reserve } from "./Reserve";

describe("Reserve entity", () => {
  test("successfully create an reserve entity", () => {
    const reserve = new Reserve({
      customerId: "ajajajajja",
      tableId: "@&@&@;@",
      date: "2025-07-29T15:00"
    });
    
    expect(reserve).toBeDefined();
  });
  
  test("should not be able to create an reserve with invalid date", () => {
    expect(() => new Reserve({
      customerId: "ajajajajja",
      tableId: "@&@&@;@",
      date: "2021-07-20T15:00"
    })).toThrow("Invalid date.");
  });
});