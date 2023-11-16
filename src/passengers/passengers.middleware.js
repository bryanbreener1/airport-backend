import { AppError} from '../errors/index.js'

import { PassengerService } from "./passengers.service.js"

const passengerService = new PassengerService()

export async function validateExistPassenger(req, res, next){
    const {id} = req.params
    const passenger = await passengerService.findOnePassenger(id)
    if(!passenger){
        return next(new AppError(`passenger with id: ${id} not found`, 404))
    }
    req.passenger = passenger
    next()
}