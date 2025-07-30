import { Router } from "express";

import { authorization } from "./middlewares/authorization";
import { adminRole } from "./middlewares/admin-role";

import { createCustomerController } from "./useCases/CreateCustomer";
import { authenticateCustomerController } from "./useCases/AuthenticateCustomer";
import { createTableController } from "./useCases/CreateTable";
import { listTablesController } from "./useCases/ListTables";
import { updateTableController } from "./useCases/UpdateTable";
import { deleteTableController } from "./useCases/DeleteTable";
import { createReserveController } from "./useCases/CreateReserve";

const router = Router();

router.post("/users", (request, response) => createCustomerController.handle(request, response));

router.post("/auth", (request, response) => authenticateCustomerController.handle(request, response));


router.post("/tables", authorization, adminRole, (request, response) => createTableController.handle(request, response));

router.get("/tables", authorization, (request, response) => listTablesController.handle(request, response))

router.patch("/tables/:id", authorization, adminRole, (request, response) => updateTableController.handle(request, response))

router.delete("/tables/:id", authorization, adminRole, (request, response) => deleteTableController.handle(request, response))

router.post("/reserves", authorization, (request, response) => createReserveController.handle(request, response));

export { router };