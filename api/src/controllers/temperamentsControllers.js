const axios = require('axios')
const { Temperament } = require('../db')
require('dotenv').config();

const { APY_KEY } = process.env

const URL = 'https://api.thedogapi.com/v1/breeds'


async function getTemperaments(req, res, next) {

    let temperamentsDB
    try {

        temperamentsDB = await Temperament.findAll()

       
        if (!temperamentsDB.length) {
            const response = await axios.get(`${URL}?api_key=${APY_KEY}`)
            
            let temperaments = []

            response.data.forEach((dog) => {

                if (dog.temperament) {
                    let arr = dog.temperament.split(', ')

                    temperaments = [...temperaments, ...arr]
                }
            })

            let set = new Set(temperaments)

            let arr = [...set]

          
            let bulk = arr.map(name => {
             
                return{
                    name
                }
            })

            bulk.sort((a, b) => {
                if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                    return 1;
                }
                if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                    return -1;
                }
                return 0;
            });

            
           temperamentsDB = await Temperament.bulkCreate(bulk)
           
        }

        res.send(temperamentsDB)
    } catch (error) {
        console.log(error)

        next(error)
    }

}

module.exports = { getTemperaments}