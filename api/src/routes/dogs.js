const { Router } = require('express')
const {getDogs, getDogsIdRaza, postDogs,} = require('../controllers/dogsControllers')
const router = Router()


router.get('/', getDogs)

router.get('/:idRaza', getDogsIdRaza)

router.post('/', postDogs)

module.exports = router