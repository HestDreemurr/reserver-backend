import { Request, Response, NextFunction } from "express";
import { AppError } from "@/http/app-error";
import { ZodError } from "zod";

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
  
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: error.issues[0].message
    });
  }
  
  console.error(error);
  
  return response.status(500).json({
    message: "Erro interno no servidor."
  });
}