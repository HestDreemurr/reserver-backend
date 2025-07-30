import { Request, Response, NextFunction } from "express";

export async function adminRole(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.user.role !== "ADMIN") {
    return response.status(401).json({
      message: "Only admins can use this route."
    });
  }
  
  next();
}