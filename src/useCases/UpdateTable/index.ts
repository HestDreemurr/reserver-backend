import { PrismaTablesRepository } from "@/repositories/implementations/PrismaTablesRepository";
import { UpdateTableUseCase } from "./UpdateTableUseCase";
import { UpdateTableController } from "./UpdateTableController";

const prismaTablesRepository = new PrismaTablesRepository();

const updateTableUseCase = new UpdateTableUseCase(prismaTablesRepository);

const updateTableController = new UpdateTableController(updateTableUseCase);

export { updateTableController };