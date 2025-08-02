import { PrismaReservesRepository } from "@/repositories/implementations/PrismaReservesRepository";
import { CancelReserveUseCase } from "./CancelReserveUseCase";
import { CancelReserveController } from "./CancelReserveController";

const prismaReservesRepository = new PrismaReservesRepository();

const cancelReserveUseCase = new CancelReserveUseCase(prismaReservesRepository);

const cancelReserveController = new CancelReserveController(cancelReserveUseCase);

export { cancelReserveController };