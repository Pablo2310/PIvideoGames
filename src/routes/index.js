// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const express = require('express');
const router = express.Router();
const routergames = require ('./RouterGames')
// const {goutergenr} = require ('./RouterGenr')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/games', routergames)
// router.use('/genero', routergenr)


module.exports = router;
