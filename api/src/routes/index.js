const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const videogamesRouter= require('./videogamesRoute')
const genresRouter= require('./genresRoute')

router.use('/', videogamesRouter);
router.use('/', genresRouter);



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
