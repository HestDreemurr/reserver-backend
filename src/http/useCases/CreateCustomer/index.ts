import { PrismaCustomersRepository } from "@/repositories/implementations/PrismaCustomersRepository";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { CreateCustomerController } from "./CreateCustomerController";

const sequelizeCustomersRepository = new PrismaCustomersRepository();

const createCustomerUseCase = new CreateCustomerUseCase(sequelizeCustomersRepository);

const createCustomerController = new CreateCustomerController(createCustomerUseCase);

export { createCustomerController };