import { Reserve } from "@/entities/Reserve";

export interface IListReservesRequestDTO {
  customerId: string;
}

export interface IListReservesResponseDTO {
  data: Promise<Reserve[]>;
}