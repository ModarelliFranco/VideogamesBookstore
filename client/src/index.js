import React from 'react';
import  ReactDOM  from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from '../src/redux/store/index.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
// axios.defaults.baseURL = 'https://videogamesbookstoreback-production.up.railway.app/';


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//BrowserRouter nos permite acceder al ruteo, para eso "abrazamos nuestra <App />"

//document.getElementById('root') Agarra el div que se encuentra en './public/index.html 
//que contiene el id root y dentro de ese div mete la app de react 

//Provider le da acceso al store a todos mis componentes. 
//Estos podrian subscribirse a nuestro store, despachar acciones y modificar el estado global

