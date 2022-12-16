import { 
    GET_ALL_GAMES, 
    GET_NAME_GAME, 
    ERROR, FILTER_CREATED, 
    ORDER_BY, POST_GAME, GET_GENRES, 
    ORDER_BY_GENRE, GET_DETAILS, CLEAN_DETAIL
} from '../actions/constants'


const initialState = {
    games: [],
    allGames: [],
    genres: [],
    detail: [],
    error: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                games: action.payload,
                allGames: action.payload,
            };

        case GET_NAME_GAME:
            return {
                ...state,
                games: action.payload
            };

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        case POST_GAME:
            return {
                ...state
            };
        
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        
        case CLEAN_DETAIL:
            return{
                ...state, 
                detail:{}
            }

        case FILTER_CREATED:
            var filtrado = undefined

            if (action.payload === 'api') {
                 filtrado = state.allGames.filter(game => typeof game.id === 'number')
            }

            if (action.payload === 'db') {
                filtrado = state.allGames.filter(game => typeof game.id === 'string')
            }

            if (action.payload === 'all') {
                filtrado = state.allGames.filter(game => typeof game.name === 'string')
            }
            return {
                ...state,
                games: filtrado
            };

        case ORDER_BY:
            let SortedOrder = action.payload === 'A-Z' ?
                state.games.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1
                    }
                    return 0;
                })
                : action.payload === 'Z-A' ?
                    state.games.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0;
                    })
                    : action.payload === 'best' ?
                        state.games.sort(function (a, b) {
                            if (a.rating > b.rating) {
                                return -1;
                            }
                            if (b.rating > a.rating) {
                                return 1
                            }
                            return 0;
                        }) :
                        state.games.sort(function (a, b) {
                            if (a.rating > b.rating) {
                                return 1;
                            }
                            if (b.rating > a.rating) {
                                return -1
                            }
                            return 0;
                        })
            return {
                ...state,
                games: SortedOrder
            }


        case ORDER_BY_GENRE:
            let filterGenre = state.allGames.filter(game => game.genres.includes(action.payload))
            return {
                ...state,
                games: filterGenre
            };


        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return { ...state }
    }

}

export default rootReducer;

//El reducer es una función que recibe dos parámetros, el estado inicial y una acción y dependiendo del tipo de acción realizará
//una operación u otra en el estado. Siempre de manera inmutable, no podemos modificar el estado, si no crear una copia a partir del anterior.
