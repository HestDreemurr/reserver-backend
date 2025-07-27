import { Request, Response, NextFunction } from "express";
import { decrypt } from "@/lib/jwt";

export async function authorization(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return response.status(401).json({
      message: "Token is missing."
    });
  }
  
  const payload = decrypt(token);
  
  if (!payload) {
    return response.status(401).json({
      message: "Invalid token."
    });
  }
  
  request.user = payload;
  next();
}