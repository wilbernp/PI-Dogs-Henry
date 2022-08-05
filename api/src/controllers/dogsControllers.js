const axios = require('axios');
const { Op } = require('sequelize');
require('dotenv').config();


const { Dog, Temperament, Breed } = require('../db.js') 
const mapData = require('./mapData/mapData.js')

const { APY_KEY } = process.env




const URL = 'https://api.thedogapi.com/v1/breeds'


async function getDogs(req, res, next) {

    const { name } = req.query

    const promiseDogsApi = axios.get(`${URL}?api_key=${APY_KEY}`)

    let promiseDogsDB 

    if (!name) {
            promiseDogsDB = Dog.findAll({
                attributes:{exclude:["BreedId"]},
                include: [{
                    model: Temperament,
                    through: { attributes: [] },
                },
                {
                    model: Breed
                }
            ],
                order:[
                    ["createdAt", "DESC"]
                ]
            })
    }

    else {
        promiseDogsDB = Dog.findAll({
            attributes:{exclude:["breedId"]},
            include: [{
                model: Temperament,
                through: { attributes: [] },
            },
            {
                model: Breed
            }
        ],
            where: {
                name: {
                    
                    [Op.iLike]: `%${name}%`
                }
            }
        })


    }

    try {
        const [dogsDB, dogsApi] = await Promise.all([promiseDogsDB, promiseDogsApi])
       
        const allDogs = mapData([...dogsDB, ...dogsApi.data], name)

        res.send(allDogs)
    } catch (error) {
        console.log(error)

        next(error)
    }

}


async function getDogsIdRaza(req, res, next) {
    const { idRaza } = req.params

    try {
        if (idRaza.includes('-')) {

            const dog = await Dog.findAll({
                include: [{
                    model: Temperament,
                    through: { attributes: [] },
                }],
                where: {
                    id: idRaza
                }
            })
           
            const [dogFilter] = mapData(dog)

            return res.send(dogFilter)
        }

        const response = await axios.get(`${URL}?api_key=${APY_KEY}`)

        const dog = response.data.find(d => d.id === Number(idRaza))

        const [dogMaped] = mapData([dog])

        res.send(dogMaped)

    } catch (error) {
        next(error)
    }


}


async function postDogs(req, res, next) {

    let imagesUrl = [
        "http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
        "https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/purina-7-razas-de-perros-peque%C3%B1os-para-departamento.png?itok=YVNHzG8L",
        "https://i0.wp.com/thehappening.com/wp-content/uploads/2015/12/chihuahua.jpg",
        "https://www.elcolombiano.com/documents/10157/0/815x565/18c0/780d565/none/11101/LJII/image_content_33647778_20190618090316.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV-UimQHV5mSZdPCDc-8cMS33mqtJ1rsQ7FQ&usqp=CAU"
    ]

    let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        min_life_span,
        max_life_span,
        temperaments,
        image,
        breedId
    } = req.body
    console.log(breedId)
    if (!image) {
        image = imagesUrl[Math.trunc(Math.random() * (imagesUrl.length - 0) + 0)]
    }

    try {
        const dog = await Dog.create({
            name,
            min_height,
            max_height,
            min_weight,
            max_weight,
            min_life_span,
            max_life_span,
            image,
            BreedId:breedId
        })

        temperaments.forEach(t => dog.addTemperament(t.id))

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        next(error)
    }

}

module.exports = {
    getDogs,
    getDogsIdRaza,
    postDogs,
}