import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


export default store

//Representa el estado de la aplicación, es conocido dentro de Redux como “la única fuente de la verdad”

//applyMiddleware nos permite utilizar thunk y redux devtools

//thunk nos permite utilizar funciones asincronas 

//composeWithDevTools nos permite usar las tools dentro del navegador 

//El store se exporta al index.js a traves del provider 