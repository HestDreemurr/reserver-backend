import { Router } from "express";

import { authorization } from "./middlewares/auth";
import { adminRole } from "./middlewares/admin";

import { createCustomerController } from "./useCases/CreateCustomer";
import { authenticateUserController } from "./useCases/AuthenticateCustomer";
import { createTableController } from "./useCases/CreateTable";
import { listTablesController } from "./useCases/ListTables";
import { updateTableController } from "./useCases/UpdateTable";

const router = Router();

router.post("/users", (request, response) => createCustomerController.handle(request, response));

router.post("/auth", (request, response) => authenticateUserController.handle(request, response));

router.post("/tables", authorization, adminRole, (request, response) => createTableController.handle(request, response));

router.get("/tables", authorization, (request, response) => listTablesController.handle(request, response))

router.patch("/tables/:id", authorization, (request, response) => updateTableController.handle(request, response))

export { router };