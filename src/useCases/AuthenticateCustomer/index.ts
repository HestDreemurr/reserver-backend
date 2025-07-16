import { SequelizeCustomersRepository } from "@/repositories/implementations/SequelizeCustomersRepository";
import { AuthenticateCustomerUseCase } from "./AuthenticateCustomerUseCase";
import { AuthenticateCustomerController } from "./AuthenticateCustomerController";

const sequelizeCustomersRepository = new SequelizeCustomersRepository();

const authenticateCustomerUseCase = new AuthenticateCustomerUseCase(sequelizeCustomersRepository);

const authenticateUserController = new AuthenticateCustomerController(authenticateCustomerUseCase);

export { authenticateUserController };