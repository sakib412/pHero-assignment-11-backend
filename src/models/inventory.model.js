import { model, Schema } from "mongoose";
import { INVENTORY } from "./collectionName";

const InventorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    quantity: { type: Number, required: true },
    supplier: String,
    price: {
        type: Number,
        required: true
    },
    email: String
}, { timestamps: true });

export const Inventory = model(INVENTORY, InventorySchema);