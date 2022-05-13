import { Router } from "express";
import { addItem, deleteItem, getItems, getLoggedInUserItems, getSingleItem, updateItemStock } from "../controllers/inventory.controllers";
import verifyJWT from "../middleware/verifyJWT";

const inventoryRouter = Router()

inventoryRouter.route('/')
    .get(getItems)
    .post(addItem)

inventoryRouter.get('/me', verifyJWT, getLoggedInUserItems)
inventoryRouter.route('/:id')
    .get(getSingleItem)
    .put(updateItemStock)
    .delete(deleteItem)


export default inventoryRouter