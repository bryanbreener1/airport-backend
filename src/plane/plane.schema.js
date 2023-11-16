import z from 'zod'
import { extractValidationData } from '../common/utils/extractErrorData.js'

export const planeSchema = z.object({
    planeNumber: z.number(),
    model: z.string().max(20),
    maxCapacity: z.number(),
    aeroline: z.enum(['sky','latam','startline','skyline','bianca']),
    status: z.boolean().optional(),
})

export function validatePlane(data){
    const result = planeSchema.safeParse(data)
    const {hasError, errorMessages, data: planeData} =  extractValidationData(result)
    return {
        hasError,
        errorMessages,
        planeData
    }
}

export function validatePartialPlane(data){
    const result = planeSchema.partial().safeParse(data)
    const {hasError, errorMessages, data: planeData} =  extractValidationData(result)
    return {
        hasError,
        errorMessages,
        planeData
    }
}