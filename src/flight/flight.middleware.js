import { FlightService } from "./flight.service.js"
import { AppError } from "../errors/appError.js"

const flightService = new FlightService()

export const validateExistFlight = async(req,res,next) => {
    const {id} = req.params
    const {status} = req.query

    const flight = await flightService.findOneFlight(id, status)

    if(!flight){
        return next(new AppError(`fligh with id: ${id} not found`, 404))
    }
    req.flight = flight
    next()
}