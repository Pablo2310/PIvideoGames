const {Router} = require ('express');
const router = Router()
const axios = require('axios');
const { API_KEY } = process.env;

router.get('/getApiGames', async (req, res) => {
   try {
    const APIgames = await axios.get('https://api.rawg.io/api/games?key=${API_KEY}&page_size=100')
    res.status(200).send(APIgames.data);
   } catch (error) {
       console.log(error)
   } 
});

module.exports = router;