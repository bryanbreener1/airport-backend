import { CityService } from "../city/city.service.js";
import { httpClient } from "../config/plugins/http-client.plugin.js";
import { AppError } from "../errors/appError.js";
import { catchAsync } from "../errors/catchAsync.js";
import Flight from "./flight.model.js";
import { validateFlight, validatePartialFlight } from "./flight.schema.js";
import { FlightService } from "./flight.service.js";
import { envs } from '../config/enviroments/enviroments.js'
import { TicketService } from "../tickets/ticket.service.js";

const flightService = new FlightService()
const cityService = new CityService()
const ticketService = new TicketService()

export const findAllFlights = catchAsync(async(req,res,next)=>{
    const flights = await flightService.findAllFlights()
    return res.json(flights)
})

export const createFlight = catchAsync(async(req, res, next)=>{
    const {hasError, errorMessages, flightData} = validateFlight(req.body)
    if(hasError){
        res.status(422).json({
            status: 'error',
            errorMessages
        })
    }
    const flight = await flightService.createFlight(flightData)
    return res.json(flight)
})

export const findOneFlight = catchAsync(async(req,res,next)=>{
    const { flight } = req
    return res.json(flight)
})

export const updateFlight = catchAsync(async(req,res,next)=>{
    const {hasError, errorMessages, flightData} = validatePartialFlight(req.body)
    if(hasError){
        res.status(422).json({
            status: 'error',
            errorMessages
        })
    }
    const {flight} = req
    const flightUpdated = await flightService.updateFlight(flight, flightData)
    return res.json(flightUpdated)
})

export const deleteFlight = catchAsync(async(req,res,next)=>{
    
    const {flight} = req
    const ticket = await ticketService.findOneTicketByFlightId(flight.id)  
    if(ticket){
        return next(new AppError('this flight cant be deleted because has tickets assigned', 400))
    }
    await flightService.deleteFlight(flight)
    return res.status(204).json(null)
})


export const approveFlight = catchAsync(async(req,res,next) => {
    const {id} = req.params
    
    const flight = await flightService.findOneFlight(id,'pending')

    if(!flight){
        return next(new AppError(`flight with id: ${id} not found`,404))
    }

    const originCityPromise = cityService.findOneCity(flight.originId)
    const destinationcityPromise = cityService.findOneCity(flight.destinationId)
    const [originCity, destinationcity] = await Promise.all([originCityPromise, destinationcityPromise])


    if(!originCity){
        return next(new AppError(`city with id: ${id} not found`,404))
    }

    if(!destinationcity){
        return next(new AppError(`city with id: ${id} not found`,404))

    }
    const weatherConditions = await httpClient.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${originCity.lat}&lon=${originCity.long}&appid=${envs.WEATHER_KEY}`
    )
    console.log(weatherConditions);

    if(weatherConditions.weather[0].main === 'Rain'){
        return next(
            new AppError('the weather conditions are dangerous', 400)
        )
    }

    const updatedFlight = await flightService.updateFlight(flight, {
        status: 'inProgress',
        checkIn : new Date()
    })

    return res.status(200).json(updatedFlight)
})