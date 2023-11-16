import { catchAsync } from "../errors/catchAsync.js";
import { validatePlane, validatePartialPlane } from "./plane.schema.js";
import { PlaneService } from "./plane.service.js";

const planeService = new PlaneService()


export const findAllPlanes = catchAsync(async(req,res,next)=>{
    const planes = await planeService.findAllPlanes()
    return res.json(planes)
})

export const createPlane = catchAsync(async(req, res, next)=>{
    const {hasError, errorMessages, planeData} = validatePlane(req.body)
    if(hasError){
        res.status(422).json({
            status: 'error',
            errorMessages
        })
    }
    const plane = await planeService.createPlane(planeData)
    return res.json(plane)
})

export const findOnePlane = catchAsync(async(req,res,next)=>{
    const { plane } = req
    return res.json(plane)
})

export const updatePlane = catchAsync(async(req,res,next)=>{
    const {hasError, errorMessages, planeData} = validatePartialPlane(req.body)
    if(hasError){
        res.status(422).json({
            status: 'error',
            errorMessages
        })
    }
    const {plane} = req
    const planeUpdated = await planeService.updatePlane(plane, planeData)
    return res.json(planeUpdated)
})

export const deletePlane = catchAsync(async(req,res,next)=>{
    const {plane} = req
    await planeService.deletePlane(plane)
    return res.status(204).json(null)
})