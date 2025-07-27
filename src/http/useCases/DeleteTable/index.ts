import { PrismaTablesRepository } from "@/repositories/implementations/PrismaTablesRepository";
import { DeleteTableUseCase } from "./DeleteTableUseCase";
import { DeleteTableController } from "./DeleteTableController";

const prismaTablesRepository = new PrismaTablesRepository();

const deleteTableUseCase = new DeleteTableUseCase(prismaTablesRepository);

const deleteTableController = new DeleteTableController(deleteTableUseCase);

export { deleteTableController };