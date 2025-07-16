import { Router } from "express";

import { createCustomerController } from "./useCases/CreateCustomer";
import { authenticateUserController } from "./useCases/AuthenticateCustomer";

const router = Router();

router.post("/users", (request, response) => createCustomerController.handle(request, response));

router.post("/auth", (request, response) => authenticateUserController.handle(request, response));

export { router };