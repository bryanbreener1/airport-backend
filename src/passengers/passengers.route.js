import { Router } from "express";
import { validateExistPassenger } from "./passengers.middleware.js";
import {
  findAllPassengers,
  createPassenger,
  findOnePassenger,
  updatePassenger,
  deletePassenger,
} from "./passengers.controller.js";
import { restrictTo } from "../auth/auth.middleware.js";

export const router = Router();

router
  .route("/")
  .get(findAllPassengers)
  .post(restrictTo('developer', 'manager', 'receptionist') ,createPassenger);

router
  .route("/:id")
  .get(validateExistPassenger, findOnePassenger)
  .patch(validateExistPassenger, updatePassenger)
  .delete(validateExistPassenger, deletePassenger)


