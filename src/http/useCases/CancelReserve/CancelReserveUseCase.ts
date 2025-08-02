import { IReservesRepository } from "@/repositories/IReservesRepository";
import { ICancelReserveRequestDTO } from "./CancelReserveDTO";
import { AppError } from "@/http/app-error";

export class CancelReserveUseCase {
  constructor(
    private reservesRepository: IReservesRepository
  ) {}
  
  async execute({
    reserveId,
    customerId
  }: ICancelReserveRequestDTO) {
    const reserve = await this.reservesRepository.findById(reserveId);
    
    if (!reserve) {
      throw new AppError("This reserve don't exists.");
    }
    
    if (reserve.customerId !== customerId) {
      throw new AppError("Only the reserve owner can cancel it.");
    }
    
    await this.reservesRepository.cancel(reserveId);
  }
}