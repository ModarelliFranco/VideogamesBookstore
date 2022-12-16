import React from "react";
import { Link, } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { getDetail, cleanDetail } from "../../redux/actions";
import Loading from "../Loading/Loading";
import styles from '../GameDetail/GameDetail.module.css'

export default function Detail(props){
    const dispatch = useDispatch();
    
   const id = props.match.params.id
   
    var regex = /<[^>]*>/g

    useEffect(() => {
        dispatch(getDetail(id))
        return () => dispatch(cleanDetail(id))
     },[dispatch,id])

    const myGame = useSelector((state) => state.detail)

    return(
        <div className={styles.container}>
           
        {
            
            myGame.length > 0 ? 
            <div className={styles.Card}>
            <h1> {myGame[0].name} </h1>
            <h4> Genres: {myGame[0].genres.map(e => e.name + ' ') } </h4>
            <div className={styles.Image}><img src={myGame[0].background_image} alt='img not found' />
            <div><h3 id={styles.rating}> ★ {myGame[0].rating} </h3></div></div>
            <h4> Released: {myGame[0].released} </h4>
            <h4> Platforms: {myGame[0].platforms.join(', ')} </h4>
            <h5> {myGame[0].description ? myGame[0].description : 'A great game' } </h5>
            <Link to='/home'>
            <button>HOME</button>
            </Link>
            </div> : myGame.name ?
            <div className={styles.Card}>
            <h1> {myGame.name} </h1>
            <h4> Genres: {myGame.genres.join(', ')} </h4>
            <div className={styles.Image}>
            <img src={myGame.background_image} alt='img not found'/>
            <div><h3 id={styles.rating}> ★ {myGame.rating} </h3></div>
            </div>
            <h4> Released: {myGame.released} </h4>
            <h4> Platforms: {myGame.platforms.join(', ')} </h4>
            <h5> {myGame.description ? myGame.description.replace(regex, '') : 'A great game' } </h5>
            <Link to='/home'>
            <button>HOME</button>
            </Link>
            </div> :
            
             <Loading/>
        }
        </div>
        
    )
}

