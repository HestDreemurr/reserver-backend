import { Request, Response, NextFunction } from "express";
import { AppError } from "@/app-error";

export async function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      message: error.message
    });
  }
  
  console.error(error);
  
  return response.status(500).json({
    message: "Erro interno no servidor."
  });
}