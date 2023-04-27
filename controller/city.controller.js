import { City } from "../model/city.model.js";

export const addCity = (request, response, next) => {
    City.create({ stateId: request.body.id, name: request.body.name }).then(result => {
        return response.status(200).json({ msg: "City Added SuccesFully", status: true });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ msg: "Internal Server Error", status: false });
    })
}

export const cityList = (request, response, next) => {
    City.find().then(result => {
        return response.status(200).json({ state: result, msg: "State List", status: true });
    }).catch(err => {
        return response.status(500).json({ err: "Internal Server Error", status: false })
    })
}
export const findCityByState = async(request, response, next) => {
    const { state } = request.params;
    try {
        const cities = await City.find({ state });
        response.send(cities);
    } catch (err) {
        console.error(err);
        response.status(500).send('Server error');
    }
};

export const addSingleCity = async (request, response,next) => {
    const name = request.body;
    try {
      const city = await City.findOne(name);
      if (city) {
        return response.status(400).json({ message: 'City already exists',status: false});
      }
      const newCity = new City( name) ;
      await newCity.save();
      return response.status(200).json({Message: "City Saved success...",status:true});
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Server Error',status: false });
    }
  }


export const deleteCity = async (request , response) => {
  const id = req.params.id;
  try {
    const result = await City.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      response.status(204).json({Message: "State Deleted Seccessfully...",status: true});
    } else {
      response.status(404).send({ message: 'State not found' ,status: false});
    }
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
};

