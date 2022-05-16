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

// handle errors
app.use(errorHandler)
export const start = async () => {
    try {
        connect();
        app.listen(config.port, () => {
            console.log(`REST API on http://localhost:${config.port}/`)
        })
    } catch (e) {
        console.error(e)
    }
}