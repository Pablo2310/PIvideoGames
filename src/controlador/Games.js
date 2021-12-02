const {Router} = require ('express');
require('dotenv').config();
const router = Router()
const axios = require('axios');
//const { Videogame, Genr, Video_Genre } = require('../db.js');
const e = require('express');
const { API_KEY } = process.env;

// const obtenerGames =  async(req,res) => {
    
//     try {
//         const APIgames = await axios.get("https://api.rawg.io/api/games?key="+API_KEY+"&page_size=100")
//         const db = await Videogame.findAll()

//         const form = APIgames.data.results.map(g=>{
//             return{
//             id:        g.id,
//             name:      g.name,
//             image:     g.image,
//             genr:      g.Genr,
//             platforms: g.platforms
//            }
//         })
// if(!db){
//     res.send(form)
// } else {
//     const concat = [...APIgames.data.results, ...db]
//     res.send (concat)
// }
    
//         } catch (e){
//         res.send(e)
//     }
// }

// const crearJuego = async (req,res)=> {
//     res.send(req.body) 
// }
    
    


module.exports = {
    // obtenerGames,
    // crearJuego,
    
}