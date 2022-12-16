import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getGenres, orderBy } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Search from "../SearchBar/Search";
import Paginated from "../Paginated/Paginated";
import FilterBy from "../FilterBy/FilterBy";
import OrderByGenre from "../OrderByGenre/OrderByGenre";
import Loading from "../Loading/Loading";
import LoadingCard from "../Loading/LoadingCards";
import Error from "../Error/Error";
import styles from "../Home/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const games = useSelector((state) => state.games);
  const [orden, setOrder] = useState("");
  const [loading, setLoading] = useState(false)

  ////////////////          PAGINADO         ////////////////////

  //Declaro un estado local donde le paso la pagina actual y donde arrancara
  const [currentPage, setCurrentPage] = useState(1);
  //Otro estado con la cantidad de juegos por pagina
  const [gamesPerPage, setGamesPerPage] = useState(15); //el readme pide 15 juegos
  //Seteo el index del ultimo juego.
  const indexOfLastGame = currentPage * gamesPerPage; //15
  //Seteo el index del primer juego.
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; // 0
  //Guardo los juegos que hay que renderizar dependiendo la pagina
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame); //Corto el arreglo y lo guardo en la constante

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  ////////////////          PAGINADO         ////////////////////

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres());
  }, [dispatch]);

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setOrder(e.target.value);
    console.log(setGamesPerPage);
    console.log(orden)
  }

  function handleClick(e) {
    e.preventDefault();
    window.location.reload(false)
  }

  return error ? (
    <Error
    error={error}/>
  ) : games.length ? (
    <div>
      <nav className={styles.navBar}>
        <h1>Videogames <br /> Bookstore <br /><span>By: Franco Modarelli</span></h1>
        <div className={styles.navBtn}>
        <li>
        <button onClick={(e) => handleClick(e)}>RELOAD GAMES</button>
        </li>
        <li>
        <Link to="/gamecreate">
        <button>CREATE YOUR GAME</button>
        </Link>
        </li>
        </div>
        <Search 
        setLoading={setLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}/>
      </nav>
      <div className={styles.filters}>
        <h4>Order by:</h4>
        <li>
          <select defaultValue={"DEFAULT"} onChange={(e) => handleSort(e)}>
            <option value="DEFAULT" disabled>Alphabet</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            </select>
            <select defaultValue={"DEFAULT"} onChange={(e) => handleSort(e)}>
            <option value="DEFAULT" disabled>Rateds</option>
            <option value="best">Best rated</option>
            <option value="worst">Worst rated</option>
          </select>
          <OrderByGenre 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          />
          <FilterBy/>
        </li>
      </div>
      <div className={styles.Paginated}>
      <Paginated 
        gamesPerPage={gamesPerPage}
        games={games.length}
        paginated={paginated}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      </div>
      {loading ? <LoadingCard/> : <div>
      <div className={styles.cards}>
        {currentGames.map((g) => {
          return (
            <div key={g.id}>
                <Card name={g.name} img={g.background_image} genre={g.genres} rating={g.rating} id={g.id}/>
            </div>
          );
        })}
      </div>
      <br />
      </div>}</div>
  ) : (
    <Loading/>
  );  
}

//Use effect nos permite controlar el ciclo de vida del componente,
//si quiero que algo se ejecute solo cuando se monta el componente le paso en el segundo parametro un array vacio.
//si quiero que se ejecute cuando se desmonta mi componente retorno una accion
