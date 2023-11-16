import z from 'zod'
import { extractValidationData } from '../common/utils/extractErrorData.js'

export const flightSchema = z.object({
    originId: z.number(),
    destinationId: z.number(),
    planeId: z.number(),
    departureTime: z.string(),
    checkIn: z.string().optional(),
    status: z.enum(['pending', 'in_progress', 'done','cancelled']).optional()
})

export function validateFlight(data){
    const result = flightSchema.safeParse(data)
    const {hasError, errorMessages, data: flightData} =  extractValidationData(result)
    return {
        hasError,
        errorMessages,
        flightData
    }
}

export function validatePartialFlight(data){
    const result = flightSchema.partial().safeParse(data)
    const {hasError, errorMessages, data: flightData} =  extractValidationData(result)
    return {
        hasError,
        errorMessages,
        flightData
    }
}