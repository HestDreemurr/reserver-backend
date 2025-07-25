export interface IUpdateTableRequestDTO {
  id: string;
  changes: {
    name?: string;
    capacity?: number;
    status?: "available" | "reserved" | "inactive";
  };
}