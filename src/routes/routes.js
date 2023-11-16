import { Router } from 'express'
import { router as passengerRouter } from '../passengers/passengers.route.js'
import { router as cityRouter } from '../city/city.route.js'
import { router as userRouter } from '../auth/auth.route.js'
import { router as flightRouter } from '../flight/flight.router.js'
import { router as planeRouter} from '../plane/plane.router.js'
import { protect } from '../auth/auth.middleware.js'
import { router as ticketRouter } from '../tickets/ticket.route.js'
import { router as bookingRouter } from '../bookings/booking.route.js'

export const router = Router()
router.use('/user', userRouter)
router.use(protect)
router.use('/passengers', passengerRouter)
router.use('/city', cityRouter)
router.use('/flight', flightRouter)
router.use('/plane', planeRouter)
router.use('/ticket', ticketRouter)
router.use('/booking', bookingRouter)
