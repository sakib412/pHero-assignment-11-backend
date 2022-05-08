const express = require('express')
const cors = require('cors')
const { json, urlencoded } = require('body-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config()

// const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pyy8w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const url = `mongodb://localhost:27017/${process.env.DB_NAME}`
const app = express();
const port = process.env.PORT || 5000

// Middleware
app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))


const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "unauthorized access" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Forbidden access" });
        }
        req.decoded = decoded;
        next();
    });
}

async function run() {
    try {
        await client.connect();
        const inventoryCollection = client
            .db(process.env.DB_NAME || 'demo')
            .collection("items");

        // Login route
        app.post("/login", async (req, res) => {
            const { email } = req.body;
            const access = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "3d",
            });
            res.send({ access });
        });

        // Add item

        app.post('/inventory', async (req, res) => {

        })

        app.get('/inventory', async (req, res) => {
            res.send({})
        })


        // get all inventory
        app.get("/myInventory", verifyJWT, async (req, res) => {
            const getEmail = req.query.email;
            const decodedEmail = req.decoded.email;

            console.log(req.query);
            const query = { email: getEmail };

            if (getEmail === decodedEmail) {
                const cursor = inventoryCollection.find(query);
                const inventory = await cursor.toArray();
                res.send(inventory);
            } else {
                res.status(403).send({ message: "forbidden access" });
            }
        });

        // get inventory api
        app.get("/inventory", async (req, res) => {
            const getLimit = req.query.limit;
            console.log(req.query);

            const query = {};


            const cursor = inventoryCollection.find(query);
            let inventory;
            getLimit
                ? (inventory = await cursor.limit(6).toArray())
                : (inventory = await cursor.toArray());
            res.send(inventory);
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

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.listen(port, () => {
    console.log("App listening on port: ", port)

});