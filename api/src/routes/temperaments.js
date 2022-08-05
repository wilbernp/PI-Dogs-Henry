const { Router } = require('express')
const { getTemperaments} = require('../controllers/temperamentsControllers')
const router = Router()

router.get('/', getTemperaments)

module.exports = router