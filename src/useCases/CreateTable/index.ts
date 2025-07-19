import { SequelizeTablesRepository } from "@/repositories/implementations/SequelizeTablesRepository";
import { CreateTableUseCase } from "./CreateTableUseCase";
import { CreateTableController } from "./CreateTableController";

const sequelizeTablesRepository = new SequelizeTablesRepository();

const createTableUseCase = new CreateTableUseCase(sequelizeTablesRepository);

const createTableController = new CreateTableController(createTableUseCase);

export { createTableController };