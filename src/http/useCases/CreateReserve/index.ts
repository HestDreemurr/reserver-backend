import { PrismaReservesRepository } from "@/repositories/implementations/PrismaReservesRepository";
import { PrismaTablesRepository } from "@/repositories/implementations/PrismaTablesRepository";
import { CreateReserveUseCase } from "./CreateReserveUseCase";
import { CreateReserveController } from "./CreateReserveController";

const prismaReservesRepository = new PrismaReservesRepository();
const prismaTablesRepository = new PrismaTablesRepository();

const createReserveUseCase = new CreateReserveUseCase(
  prismaReservesRepository,
  prismaTablesRepository
);

const createReserveController = new CreateReserveController(createReserveUseCase);

export { createReserveController };