import { Router } from "express";

import { createCustomerController } from "./useCases/CreateCustomer";

const router = Router();

router.post("/users", (request, response) => createCustomerController.handle(request, response));

export { router };