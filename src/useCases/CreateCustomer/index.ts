import { SequelizeCustomersRepository } from "@/repositories/implementations/SequelizeCustomersRepository";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { CreateCustomerController } from "./CreateCustomerController";

const sequelizeCustomersRepository = new SequelizeCustomersRepository();

const createCustomerUseCase = new CreateCustomerUseCase(sequelizeCustomersRepository);

const createCustomerController = new CreateCustomerController(createCustomerUseCase);

export { createCustomerController };