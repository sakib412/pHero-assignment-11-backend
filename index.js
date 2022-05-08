const mongoose = require('mongoose');

// dotenv
require('dotenv').config()

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pyy8w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
console.log(url)
// main().catch(err => console.log(err));


// async function main() {
//     await mongoose.connect(url);
//     console.log("connected")
// }