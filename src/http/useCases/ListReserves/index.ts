import { PrismaReservesRepository } from "@/repositories/implementations/PrismaReservesRepository";
import { ListReservesUseCase } from "./ListReservesUseCase";
import { ListReservesController } from "./ListReservesController";

const prismaReservesRepository = new PrismaReservesRepository();

const listReservesUseCase = new ListReservesUseCase(prismaReservesRepository);

const listReservesController = new ListReservesController(listReservesUseCase);

export { listReservesController };