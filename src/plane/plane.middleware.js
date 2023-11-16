import { PlaneService } from "./plane.service.js"
import { AppError } from "../errors/appError.js"

const planeService = new PlaneService()

export const validateExistPlane = async(req,res,next) => {
    const {id} = req.params

    const plane = await planeService.findOnePlane(id)

    if(!plane){
        return next(new AppError(`plane with id: ${id} not found`, 404))
    }
    req.plane = plane
    next()
}