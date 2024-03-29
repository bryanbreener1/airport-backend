import Plane from "./plane.model.js";

export class PlaneService{

    async findAllPlanes(){
        return await Plane.findAll({
            where:{
                status: true
            }
        })
    }

    async createPlane(data){
        return await Plane.create(data)
    }

    async updatePlane(plane, data){
        return await plane.update(data)
    }
    
    async findOnePlane(id){
        return await Plane.findOne({
            where:{
                id,
                status:true
            }
        })
    }

    async deletePlane(plane){
        return await plane.update({status: false})
    }

}