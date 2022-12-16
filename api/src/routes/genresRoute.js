const { Router } = require("express");
const {  Genre } = require('../db')
const { getApiInfo } = require('../controllers')


const router = Router()

router.get('/genres', async (req, res) => {
    try {
        const allGames = await getApiInfo()
        const genres = allGames.flatMap(g => g.genres)
        genres.forEach(genre => {
            Genre.findOrCreate({
                where: { name: genre }
            })
        })
        const allGenres = await Genre.findAll();
        res.json(allGenres);   
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router
