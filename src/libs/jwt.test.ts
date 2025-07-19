import { describe, test, expect } from "vitest";
import { sign, decrypt } from "./jwt";

describe("JWT Tokens", () => {
  const token = sign({
    id: "123",
    role: "admin"
  });
  
  test("sign a jwt", () => {
    expect(token).toBeDefined();
  });
  
  test("verify a valid token", () => {
    const payload = decrypt(token);
    
    expect(payload.id).toBe("123");
    expect(payload.role).toBe("admin");
  });
  
  test("verify a invalid token", () => {
    const payload = decrypt("invalid-token");
    
    expect(payload).toBeUndefined();
  });
});