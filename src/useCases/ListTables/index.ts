import { PrismaTablesRepository } from "@/repositories/implementations/PrismaTablesRepository";
import { ListTablesUseCase } from "./ListTablesUseCase";
import { ListTablesController } from "./ListTablesController";

const sequelizeTablesRepository = new PrismaTablesRepository();

const listTablesUseCase = new ListTablesUseCase(sequelizeTablesRepository);

const listTablesController = new ListTablesController(listTablesUseCase);

export { listTablesController };