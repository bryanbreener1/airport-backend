import { Router } from "express";
import { 
    findAllPlanes,
    findOnePlane,
    createPlane,
    updatePlane,
    deletePlane
 } from "./flight.controller.js";
import { validateExistPlane } from "./plane.middleware.js";
import { restrictTo } from "../auth/auth.middleware.js";

export const router = Router()

router
    .route('/')
    .get(restrictTo('developer', 'admin', 'receptionist'),findAllPlanes)
    .post(createPlane)

router
    .route('/:id')
    .get(restrictTo('receptionist', 'developer', 'admin'), validateExistPlane,findOnePlane)
    .patch(restrictTo('developer', 'admin'), validateExistPlane, updatePlane)
    .delete(restrictTo('developer', 'admin'), validateExistPlane, deletePlane)