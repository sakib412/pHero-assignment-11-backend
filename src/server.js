import express from 'express';
import cors from 'cors';
import { verify, sign } from "jsonwebtoken";
import { json, urlencoded } from 'body-parser';
import 'dotenv/config'

import config from './config';
import errorHandler from './middleware/errorHandler';
import { successResponse } from './utils/response';

export const app = express();

// Middleware
app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan(config.env || 'dev'))

// Routes
app.get('/', (req, res) => {
    res.json(successResponse({ "message": "API is working" }));
})


async function run() {
    try {
        await client.connect();
        const inventoryCollection = client
            .db(process.env.DB_NAME || 'demo')
            .collection("item");

        // Login route
        app.post("/login", async (req, res) => {
            const { email } = req.body;
            const access = sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "3d",
            });
            res.json({ access });
        });

        // Add item
        app.post('/inventory', async (req, res) => {
            const { name, image, quantity, supplier, price, description, email } = req.body
            const item = {
                name,
                image,
                quantity,
                supplier,
                price,
                description,
                email
            }
            const data = await inventoryCollection.insertOne(item)
            res.json(data)
        })

        // get all items with pagination
        app.get('/inventory', async (req, res) => {
            const { page = 0, size = 10 } = req.query
            const query = {}
            const cursor = inventoryCollection.find(query)
            const data = await cursor.skip(parseInt(page) * parseInt(size)).limit(parseInt(size)).toArray()
            res.json(data)
        })

        // get items by user email
        app.get("/my-inventory", verifyJWT, async (req, res) => {
            const { email } = req.decoded;
            const query = { email };
            const cursor = inventoryCollection.find(query);
            const data = await cursor.toArray();
            res.json(data);
        });

        // get inventory by id api

        app.get("/inventory/:id", (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            inventoryCollection.findOne(query, function (err, result) {
                console.log("error", err);
                console.log("result", result);
                res.send(JSON.stringify(result));
            });
        });

        // add inventory api
        app.post("/addInventory", async (req, res) => {
            const inventory = req.body;
            const result = await inventoryCollection.insertOne(inventory);
            res.send(result);
        });

        // update inventory
        app.put("/updateInventory/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const result = inventoryCollection.updateOne(
                filter,
                { $set: data },
                { upsert: true }
            );
            res.send(result);
        });

        // update restock stock  inventory
        app.put("/updateRestock/:id", async (req, res) => {
            const id = req.params.id;
            const quantityData = req.body;
            const filter = { _id: ObjectId(id) };
            console.log(quantityData, id);
            const result = inventoryCollection.updateOne(
                filter,
                { $set: quantityData },
                { upsert: true }
            );
            res.send(result);
        });

        // delete inventory api
        app.delete("/deleteinventory/:id", async (req, res) => {
            const inventoryId = req.params;
            console.log(inventoryId);

            console.log("id", inventoryId);
            const query = { _id: ObjectId(inventoryId) };
            const result = await inventoryCollection.deleteOne(query);
            res.send(result);
        });
    } finally {
    }
}


app.get("/", (req, res) => {
    res.send("Server is running...");
});


app.use(errorHandler)
export const start = async () => {
    try {
        await connect();
        app.listen(config.port, () => {
            console.log(`REST API on http://localhost:${config.port}/api`)
        })
    } catch (e) {
        console.error(e)
    }
}