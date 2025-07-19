import { SequelizeTablesRepository } from "@/repositories/implementations/SequelizeTablesRepository";
import { ListTablesUseCase } from "./ListTablesUseCase";
import { ListTablesController } from "./ListTablesController";

const sequelizeTablesRepository = new SequelizeTablesRepository();

const listTablesUseCase = new ListTablesUseCase(sequelizeTablesRepository);

const listTablesController = new ListTablesController(listTablesUseCase);

export { listTablesController };