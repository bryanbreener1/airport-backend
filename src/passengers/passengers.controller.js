import { catchAsync} from '../errors/index.js'
import { validatePartialPassenger, validatePassenger } from "./passengers.schema.js";
import { PassengerService } from "./passengers.service.js";

const passengerService = new PassengerService()

export const findAllPassengers = catchAsync(async (req, res, next) => {
    const passengers = await passengerService.findAllPassengers()
    return res.json(passengers)
})

export const createPassenger = catchAsync(async (req, res, next) => {
  const {sessionUser} = req
    const { hasError, errorMessages, passengerData } = validatePassenger(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessages
      })
    }
    passengerData.createdBy = sessionUser.id
    const passenger = await passengerService.createPassenger(passengerData)

    return res.status(201).json(passenger)
})


export const findOnePassenger = catchAsync(async (req, res, next)  => {

    const {passenger} = req

    return res.json(passenger)

})


export const updatePassenger = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, passengerData } = validatePartialPassenger(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessages
      })
    }
    const {passenger} = req
 
    const updatedPassenger = await passengerService.updatePassenger(passenger, passengerData)

    return res.json(updatedPassenger)
})

export const deletePassenger = catchAsync(async (req, res, next) => {

    const {passenger} = req

    await passengerService.deletePassenger(passenger)
    
    return res.status(204).json(null)

})