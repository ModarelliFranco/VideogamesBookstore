import axios from 'axios';
import {
GET_NAME_GAME, 
GET_ALL_GAMES,
FILTER_CREATED, 
ORDER_BY, 
GET_GENRES, 
ORDER_BY_GENRE, 
GET_DETAILS, 
ERROR,
CLEAN_DETAIL, 
} from './constants'


export const getAllGames = () => {
  return async function(dispatch){
    try {
      const response = await axios.get('/videogames')
      const games = response.data
    dispatch({
     type: GET_ALL_GAMES,
     payload: games
  })
    } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message 
    })
   }
  } 
};

export const getNameGames = (name) => {
  return async function (dispatch){
    try {
      const response = await axios.get(`/videogames?name=${name}`)
      const gameName = response.data
      dispatch({
        type: GET_NAME_GAME,
        payload: gameName
      })
    } catch (error) {
      dispatch({
      type: ERROR,
      payload: ' Game not found'
      })
    }
  }
};

export const getGenres = () => {
  return async function (dispatch){
    try {
      const response = await axios.get('/genres')
      const genres = response.data 
      dispatch({
        type: GET_GENRES,
        payload: genres 
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message 
      })
    }
  }
};

export const postGame = (payload) => {
  return async function(dispatch){
    try {
      const response = await axios.post('/videogames',payload)
      console.log(response)
      return response;
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message 
      })
    }
  }
};

export const getDetail = (id) => {
  return async function(dispatch){
   try {
  const response = await axios.get(`/videogames/${id}`)
  const detail = response.data
  return dispatch({
    type: GET_DETAILS,
    payload: detail
  }) 
   } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message 
    })
   }
  }
};


export const cleanDetail = () =>{
  return{ type: CLEAN_DETAIL}
}


export const filterCreated = (payload) => {
  return{
    type: FILTER_CREATED,
    payload 
  }
};

export const orderBy = (payload) => {
  return{
    type: ORDER_BY,
    payload 
  }
}

export const orderByGenre = (payload) => {
  return{
    type: ORDER_BY_GENRE,
    payload 
  }
}

//Una acción es un objeto plano que representa una intención de modificar el estado.

//Las acciones son la única forma en que los datos llegan al store.

//En las actions es donde se da la comunicacion con el servidor (back)

//El dispatch (metodo del store) despacha la accion enviando el objeto al reducer 