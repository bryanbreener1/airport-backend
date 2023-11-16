import { Router } from "express";
import { 
    findAllFlights,
    createFlight,
    updateFlight,
    deleteFlight,
    findOneFlight,
    approveFlight
 } from "./flight.controller.js";
import { validateExistFlight } from "./flight.middleware.js";
import {restrictTo} from '../auth/auth.middleware.js'

export const router = Router()

router
    .route('/')
    .get(findAllFlights)
    .post(restrictTo('developer', 'admin'),createFlight)

router
    .route('/:id')
    .get(restrictTo('developer', 'admin'),validateExistFlight,findOneFlight)
    .patch(restrictTo('developer', 'admin'),validateExistFlight, updateFlight)
    .delete(restrictTo('developer', 'admin'),validateExistFlight, deleteFlight)

router.patch(
    '/approve-takeoff/:id',
    restrictTo('admin','developer'),
    approveFlight
)

