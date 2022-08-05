const axios = require('axios')
const { Breed } = require('../db')
require('dotenv').config();

const { APY_KEY } = process.env
const URL = 'https://api.thedogapi.com/v1/breeds'

async function getBreeds(req, res, next) {
    let breedsDB
    try {

        breedsDB = await Breed.findAll()
        if (!breedsDB.length) {
            const response = await axios.get(`${URL}?api_key=${APY_KEY}`)

            let breeds = []

            response.data.forEach(d => {
                if (d.breed_group && !breeds.includes(d.breed_group)) {
                    breeds.push(d.breed_group)
                }
            })

             breeds.sort((a, b) => {
                if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) {
                    return 1;
                }
                if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) {
                    return -1;
                }
                return 0;
            });
            let bulk = breeds.map((name) => {
                return {
                    name
                }
            })

            breedsDB = await Breed.bulkCreate(bulk)
        }
        res.send(breedsDB)
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getBreeds
}