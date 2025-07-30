import { randomUUID } from "crypto";
import { AppError } from "@/http/app-error";

export class Reserve {
  public readonly id: string;
  
  public customerId: string;
  public tableId: string;
  public date: Date;
  public status?: "ACTIVE" | "CANCELED";
  
  constructor(props: Omit<Reserve, "id">, id?: string) {
    Object.assign(this, props);
    
    if (new Date() > new Date(props.date)) {
      throw new AppError("Invalid date.");
    }
    
    this.date = new Date(props.date);
    this.id = id ?? randomUUID();
  }
}