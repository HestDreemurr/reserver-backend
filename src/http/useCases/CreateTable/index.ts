import { PrismaTablesRepository } from "@/repositories/implementations/PrismaTablesRepository";
import { CreateTableUseCase } from "./CreateTableUseCase";
import { CreateTableController } from "./CreateTableController";

const sequelizeTablesRepository = new PrismaTablesRepository();

const createTableUseCase = new CreateTableUseCase(sequelizeTablesRepository);

const createTableController = new CreateTableController(createTableUseCase);

export { createTableController };