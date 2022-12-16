require('dotenv').config();
const axios = require('axios');
const { APIKEY } = process.env;
const { Videogame, Genre } = require('../db.js');

const getApiInfo = async () => {
    try {
        const apiGames = []
        for (let i = 1; i < 6; i++) {
            const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`)
            apiUrl.data.results.map(g => {
                apiGames.push({
                    id: g.id,
                    name: g.name,
                    background_image: g.background_image,
                    rating: g.rating,
                    genres: g.genres.map(genre => genre.name),
                    released: g.released,
                    platforms: g.platforms.map(el => el.platform.name),
                    description: g.description
                })
            });
        }
        return apiGames;
    } catch (error) {
        res.status(400).json({error: error.message})
    }
        
    }
    
    const getDbInfo = async () => {
    try {
        return await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    }
    
    const getAllGames = async () => {
    try {
        const apiGames = await getApiInfo();
        const dbGames = await getDbInfo();
        const allGames = apiGames.concat(dbGames);
        return allGames;
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    }

    module.exports = {
     getApiInfo,
     getDbInfo,
     getAllGames
    }