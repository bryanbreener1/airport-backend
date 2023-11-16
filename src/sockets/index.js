import {FlightService} from '../flight/flight.service.js'

export class Sockets {
    constructor(io){
        this.io = io
        this.flightService = new FlightService()
        this.socketsEvents()
    }


    socketsEvents(){
        this.io.on("connection",(socket)=>{

            socket.on("get-flights", async({id})=>{
                const flights = await this.flightService.findAllFlights()
                this.io.emit("news-flights",flights)
            })
        })
    }
}