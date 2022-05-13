import { Router } from "express";
import { addItem, getItems } from "../controllers/inventory.controllers";

const inventoryRouter = Router()

inventoryRouter.route('/')
    .get(getItems)
    .post(addItem)

export default inventoryRouter