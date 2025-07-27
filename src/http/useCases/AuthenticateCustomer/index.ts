import { PrismaCustomersRepository } from "@/repositories/implementations/PrismaCustomersRepository";
import { AuthenticateCustomerUseCase } from "./AuthenticateCustomerUseCase";
import { AuthenticateCustomerController } from "./AuthenticateCustomerController";

const sequelizeCustomersRepository = new PrismaCustomersRepository();

const authenticateCustomerUseCase = new AuthenticateCustomerUseCase(sequelizeCustomersRepository);

const authenticateCustomerController = new AuthenticateCustomerController(authenticateCustomerUseCase);

export { authenticateCustomerController };