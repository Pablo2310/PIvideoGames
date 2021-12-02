const {Router} = require ('express');
require('dotenv').config();
const router = Router()
const axios = require('axios');
const { API_KEY } = process.env;

// router.get('/routerGenr', async (req, res) => {
//     try {
//         const APIgames = await axios.get("https://api.rawg.io/api/games?key="+API_KEY+"&page_size=100")
//         res.status(200).send(APIgames.data.results)
// } catch (error) {
//     console.log(error)
// } 
// });

// // router.get('/get',(req,res) => {
// //     res.send('hola');
// })
module.exports = router;