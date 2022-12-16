import React from "react";
import styles from '../Card/Card.module.css'
import { Link } from "react-router-dom";


export default function Card({ name, img, genre, rating, id }){
    //const genres = genre.join(', ')
    // const genresDb = genre.map(el => el.name + ", ")
    // console.log(genre && genre.map(g => g + ', ' ))

    return(
        <div className={styles.card}>
            <h3>{name}</h3>
            <img src={img} alt='img not found' />
            <h5>Genres:</h5>
            <p>{ typeof genre[0] !== 'string' ? genre.map(e => e.name + '-') : genre.join('-')}</p>
            <h5>Rating:</h5>
            <span>★{rating}</span>
            <Link to={`/videogames/${id}`}>
             <button>DETAILS</button>
            </Link>
        </div>
    )
}  