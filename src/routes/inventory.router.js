import { Router } from "express";
import { addItem, getItems, getLoggedInUserItems } from "../controllers/inventory.controllers";
import verifyJWT from "../middleware/verifyJWT";

const inventoryRouter = Router()

inventoryRouter.route('/')
    .get(getItems)
    .post(addItem)

inventoryRouter.get('/me', verifyJWT, getLoggedInUserItems)

export default inventoryRouter