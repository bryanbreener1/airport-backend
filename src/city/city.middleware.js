import { CityService } from "./city.service.js";

const cityService = new CityService()

export const validateExistCity = async(req, res, next) => {
  const { id } = req.params;

  const city = await cityService.findOneCity(id);

  if(!city){
    return res.status(404).json({
      status: 'error',
      message: `City not found with id: ${ id }`
    })
  }

  req.city = city
  next()
}