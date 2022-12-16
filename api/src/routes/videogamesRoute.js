const { Router } = require("express");
const axios = require('axios');
const { Videogame, Genre } = require('../db')
const { getAllGames } = require('../controllers')
const { APIKEY } = process.env;

const router = Router()


router.get('/videogames', async (req, res) => {
    try {
        const { name } = req.query;
        let totalGames = await getAllGames();
        if (name) {
        const gameName = await totalGames.filter(games => games.name.toLowerCase().includes(name.toLowerCase()))
        gameName.length ?
            res.status(200).json(gameName) :             //.splice(0,15)
            res.status(400).json(`${name} was not found`)
        } else {
            res.status(200).json(totalGames)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    })


router.post('/videogames', async (req, res) => {
    try {
        const { name, description, released, rating, platforms, genre, background_image } = req.body;
        const createGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            genre,
            background_image
        })
        const genreDb = await Genre.findAll({
            where: { name: genre }
        })
        createGame.addGenre(genreDb);
        res.status(200).json('Your game has been created successfully')
    } catch (error) {
        res.status(404).json({error: error.message})
    }
    })


router.get('/videogames/:idVideogame', async (req, res) => {
    try {
        const { idVideogame } = req.params;
        if (idVideogame.includes('-')) {
            const Games = await getAllGames();
            const gameId = await Games.filter(g => g.id == idVideogame)
            gameId.length ?
                res.status(200).json(gameId) :
                res.status(404).json(`The id: ${idVideogame} does not correspond to a videogame`)
        }else{
            const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${APIKEY}`)
            let { id, name, background_image, genres, description, released, rating, platforms } = response.data
            genres = genres.map(g => g.name); // de la API me trae un array de objetos, mapeo solo el nombre del genero
            platforms = platforms.map(p => p.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma
            return res.json({
                id,
                name,
                background_image,
                genres,
                description,
                released,
                rating,
                platforms
            })
        }        
    } catch (error) {
        res.status(404).json({error: error.message})    
        }
    })


module.exports = router
