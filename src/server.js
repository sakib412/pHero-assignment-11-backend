import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import 'dotenv/config'

import config from './config';
import errorHandler from './middleware/errorHandler';
import { successResponse } from './utils/response';
import { connect } from './utils/db';
import authRouter from './routes/auth.router';
import inventoryRouter from './routes/inventory.router';

export const app = express();

// Middleware
app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan((config.env == 'dev' || config.env == 'development') ? 'dev' : 'combine'))

// Routes
app.get('/', (req, res) => {
    res.json(successResponse({ "message": "Server is running" }));
})
app.use('/', authRouter)
app.use('/inventory', inventoryRouter)


// async function run() {
//     try {



//         // get inventory by id api

//         app.get("/inventory/:id", (req, res) => {
//             const id = req.params.id;
//             console.log(id);
//             const query = { _id: ObjectId(id) };
//             inventoryCollection.findOne(query, function (err, result) {
//                 console.log("error", err);
//                 console.log("result", result);
//                 res.send(JSON.stringify(result));
//             });
//         });



//         // update inventory
//         app.put("/updateInventory/:id", async (req, res) => {
//             const id = req.params.id;
//             const data = req.body;
//             const filter = { _id: ObjectId(id) };
//             const result = inventoryCollection.updateOne(
//                 filter,
//                 { $set: data },
//                 { upsert: true }
//             );
//             res.send(result);
//         });

//         // update restock stock  inventory
//         app.put("/updateRestock/:id", async (req, res) => {
//             const id = req.params.id;
//             const quantityData = req.body;
//             const filter = { _id: ObjectId(id) };
//             console.log(quantityData, id);
//             const result = inventoryCollection.updateOne(
//                 filter,
//                 { $set: quantityData },
//                 { upsert: true }
//             );
//             res.send(result);
//         });

//         // delete inventory api
//         app.delete("/deleteinventory/:id", async (req, res) => {
//             const inventoryId = req.params;
//             console.log(inventoryId);

//             console.log("id", inventoryId);
//             const query = { _id: ObjectId(inventoryId) };
//             const result = await inventoryCollection.deleteOne(query);
//             res.send(result);
//         });
//     } finally {
//     }
// }


app.use(errorHandler)
export const start = async () => {
    try {
        await connect();
        app.listen(config.port, () => {
            console.log(`REST API on http://localhost:${config.port}/`)
        })
    } catch (e) {
        console.error(e)
    }
}