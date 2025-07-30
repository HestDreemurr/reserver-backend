import { randomUUID } from "crypto";

export class Table {
  public readonly id: string;
  
  public name: string;
  public capacity: number;
  public status?: "AVAILABLE" | "RESERVED" | "INACTIVE";
  
  constructor(props: Omit<Table, "id">, id?: string) {
    Object.assign(this, props);
    
    this.id = id ?? randomUUID();
  }
}