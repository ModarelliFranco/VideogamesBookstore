import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGames } from "../../redux/actions";
import styles from '../SearchBar/Search.module.css'

export default function SearchBar({setCurrentPage, currentPage, setLoading }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    setLoading(true)
    dispatch(getNameGames(name));
    setCurrentPage(currentPage = 1)
    setTimeout(() => {
     setLoading(false) 
    }, 8000);
    }

  return (
    <div className={styles.container}>
      <button type="submit" onClick={(e) => handleClick(e)}>
        Search
      </button>
      <input
        placeholder="Game name.."
        type="text"
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
}
