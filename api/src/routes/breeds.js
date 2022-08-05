const {Router} = require('express')
const { getBreeds } = require('../controllers/breedsControllers')

const router = Router()



router.get('/', getBreeds)

module.exports = router