
/* todas las petciones llegaran aqui */

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const temperaments = require('./temperaments')
const dogs = require('./dogs')
const breeds = require('./breeds')


const router = Router();

router.use('/dogs', dogs)

router.use('/temperaments', temperaments)

router.use('/breeds', breeds)



module.exports = router;
