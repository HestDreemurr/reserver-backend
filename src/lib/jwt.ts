import "dotenv/config";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

export function sign(body: {
  id: string,
  role: "CUSTOMER" | "ADMIN"
}) {
  const token = jwt.sign(body, secretKey, { expiresIn: "7d" });
  return token;
}

export function decrypt(token: string) {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch {
    return undefined;
  }
}