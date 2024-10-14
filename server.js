import express from "express";
import signale from "signale";
import dotenv from 'dotenv';

import { clientRouter } from "./v1/infrastructure/interfaces/http/routers/clientRouter.js";
import { LoginRouter } from "./v1/infrastructure/interfaces/http/routers/loginRuter.js";
import { historyRouter } from "./v1/infrastructure/interfaces/http/routers/historyRouter.js";
import { servicesRouter } from "./v1/infrastructure/interfaces/http/routers/ServicesRouter.js";
import { servicesPaymentRouter } from "./v1/infrastructure/interfaces/http/routers/ServicePaymentRouter.js";
import { EmailRouter } from "./v1/infrastructure/interfaces/http/routers/MensageRouter.js";
dotenv.config();

import cors from "./node_modules/cors/lib/index.js";

const app = express()
app.use(cors());
app.use(express.json())
app.use("/api/v1",clientRouter);
app.use("/api/v1",LoginRouter);
app.use("/api/v1",historyRouter);
app.use("/api/v1",servicesRouter);
app.use("/api/v1",servicesPaymentRouter);
app.use("/api/v1",EmailRouter);


app.listen(3002, ()=> {
    signale.success("Server online in port 3002")
})