import express from "express";
import { router } from './routes/routes.js'
import { AppError } from "./errors/appError.js";
import { envs } from "./config/enviroments/enviroments.js";
import { globalErrorHandler } from "./errors/error.controller.js";
import { enableCors } from "./config/plugins/cors.plugin.js";
import { enableMorgan } from "./config/plugins/morgan.plugin.js";
import { limitRequest } from "./config/plugins/rate-limit.plugin.js";
import { setSecurityHeaders } from "./config/plugins/securityHeaders.plugin.js";
import { sanitizaterClean } from "./config/plugins/sanitizater.plugin.js";
import { setParameterPolution } from "./config/plugins/hpp.plugin.js";

const app = express();

const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:3000','http://localhost:5173','http://192.168.1.11:5173' ]
const limitRequested = limitRequest(10000,60,'too many request from this IP, try again in 1 hour loser')
const helmet = setSecurityHeaders()
const sanitizater = sanitizaterClean()
const hpp = setParameterPolution()

app.use(express.json())
app.use(limitRequested)
app.use(helmet())
app.use(sanitizater)
app.use(hpp())

if(envs.NODE_ENV === 'development'){
    enableMorgan(app)
}


enableCors(app, ACCEPTED_ORIGINS)

app.use("/api/v1", router)

app.all('*', (req, res, next) => {

    next(new AppError(`the route ${req.originalUrl} does not exist in the server`, 404))
})


app.use(globalErrorHandler)

export default app;
