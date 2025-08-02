import { IReservesRepository } from "@/repositories/IReservesRepository";
import { IListReservesRequestDTO } from "./ListReservesDTO";

export class ListReservesUseCase {
  constructor(
    private reservesRepository: IReservesRepository
  ) {}
  
  async execute({
    customerId
  }: IListReservesRequestDTO) {
    const data = await this.reservesRepository.list(customerId);
    
    return data;
  }
}