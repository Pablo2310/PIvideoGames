// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require('express');
require('dotenv').config();
const router = express.Router();
const axios = require('axios').default;
const { Videogame, Genr, Video_Genre } = require('../db');
const { API_KEY } = process.env;
// const routergames = require ('./RouterGames')
// const routergenr = require ('./RouterGenr')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/games', routergames)
// router.use('/genero', routergenr)

const ApiInfo = async () => {
    //traigo info de la API
    const APIgames = await axios.get("https://api.rawg.io/api/games?key="+API_KEY+"&page_size=100")
    const info = APIgames.data.results.map(g=>{
                    return {
                    id:        g.id,
                    name:      g.name,
                    image:     g.image,
                    genr:      g.Genr,
                    platforms: g.platforms
                   }
               })

            return info
    };

const DBinfo = async () => {
    //traigo info de la db
    return await Videogame.findAll({
        include:{
            model: Genr,
            atributes: ['name'],
            through: {atrributes: [],},
        }
    })
}

const AllVideoGames = async () => {
    const appinfo = await ApiInfo();
    const dbinfo = await DBinfo();
    const allinfo = appinfo.concat(dbinfo);
    return allinfo;
}

router.get('/videogames',  async (req, res) => {
    try{
    const name = req.query.name;
    let allGames = await AllVideoGames();
    if (name) {
        let gamesName = await allGames.filter( n => n.name.toLowerCase().includes(name.toLowerCase()))
        gamesName.length ?
        res.status(200).send(gamesName) :
        res.status(404).send('No se encontro el videojuego');
    } else {
        res.status(200).send(allGames)
           }
    } catch(error){console.log(error)}

});

router.get('/genres',  async (req, res) => {
try {

    //CORREGIR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const genrApi = await axios.get('https://api.rawg.io/api/genres?key=df1e054808e446baa25f429ca59c3ba2') /////////// CORREGIR!!!!!! SACAR LA KEY!!!!!!
    const genr = await genrApi.data.results.map(g => g.name)
    const eachGenr = genr.map(g => {
        for(let i = 0; i< genr.length; i++) return g})
        console.log(eachGenr)
        eachGenr.forEach( g => {
            Genr.findOrCreate ({
                where: { name: g}
            })
        })
        const allGenr = await Genr.findAll();
        res.send(allGenr);
        console.log(genr);
}catch(error) {
    res.send(error)
}})

router.post('/videogames',  async (req, res) => {
 /////// REVISAR EL POST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
    try {
    let {
        name,
        description,
        released,
        rating,
        platforms,
        image,
        Genr,

    } = req.body

    let gamesCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        image,
    })

    let genrDb = await Genr.findAll({
        where: { name: Genr}
    })
    gamesCreated.addGenr(genrDb);
    res.send ( 'VideoGames creado con exito!!!')
} catch (e) {
    res.send(e)
}
})

router.get('/videogames/:id',  async (req, res) => {
    const {id} = req.params
    const gamesTotal = await AllVideoGames()
        const gamesId = await gamesTotal.filter ( g => g.id == id)
        gamesId.length > 0
                  ? res.status(200).json(gamesId) 
                  : res.status(404).json({error: 'No encontre el videojuego'})
    
})

module.exports = router;
