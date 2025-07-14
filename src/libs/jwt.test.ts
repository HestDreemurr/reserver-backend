import { describe, test, expect } from "vitest";
import { sign, decrypt } from "./jwt";

describe("JWT Tokens", () => {
  test("sign a jwt", () => {
    const token = sign("123");
    
    expect(token).toBeDefined();
    console.log(`JWT Token: ${token}`);
  });
  
  test("verify a invalid token", () => {
    const payload = decrypt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJpYXQiOjE3NTI0NDQyNDAsImV4cCI6MTc1MzA0OTA0MH0.arySalCEW2LVcyPgIyPjwwCKBIW_nTiN_tS3VhTL8kw");
    
    expect(payload.userId).toBe("123");
  });
  
  test("verify a invalid token", () => {
    const payload = decrypt("invalid-token");
    
    expect(payload).toBeUndefined();
  });
});