import { envs } from "../config/enviroments/enviroments.js"
import { AppError } from "./appError.js"
import Error from "./error.model.js"

const handleCastError22001 = () => (
    new AppError('value too long for type on attribute in database ', 400)
)

const handleCastError23505 = (err) => (
    new AppError(`${err} please enter another value`, 400)
)
const handleCastError23503 = (details) => (
    new AppError(details, 400)
)
const handleJWTExpiredError = () =>(
    new AppError('your token has expired¡ Please login again', )
)

const handleTokenError = () => (
    new AppError('invalid token. please login again', 401)
)



const sendErrorDev = async(err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })
}


const sendErrorProd = async(err, res) => {
    await Error.create({
        status: err.status,
        message: err.message,
        stack: err.stack,
    })

    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else{
        res.status(500).json({
            status: 'fail',
            message: 'something went wrong'
        })
    }


}


export const globalErrorHandler = (err,req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'

    if(envs.NODE_ENV === 'development'){ 
        sendErrorDev(err, res)
    
    }
    if(envs.NODE_ENV === 'production') {

        let error = err
        
        if(err.parent?.code === '22001') error = handleCastError22001()
        if(err.parent?.code === '23505') error = handleCastError23505(err.parent.detail)
        if(err.parent?.code === '23503') error = handleCastError23503(err.parent.detail)
        if(err.name === 'TokenExpiredError') error = handleJWTExpiredError()
        if(err.name === 'JsonWebTokenError') error = handleTokenError()

        
        sendErrorProd(error, res)
    }
}


