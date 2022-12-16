import React from "react";
import styles from "../Paginated/Paginated.module.css";
//Traigo por props el estado que me renderiza cuantos games por pagina, el estado y la constante paginado

export default function Paginado({
  gamesPerPage,
  games,
  paginated,
  currentPage,
  setCurrentPage
}) {
  const pageNumber = [];

  //Recorro un arreglo en el que tomo el nro redondo que resulta de dividir los juegos por los juegos por pagina que quiero
  for (let i = 1; i <= Math.ceil(games / gamesPerPage); i++) {
    pageNumber.push(i);
  }


  const nextHandler = () => {
    if (currentPage >= pageNumber.length) setCurrentPage(currentPage = 0)
      setCurrentPage(currentPage + 1);
  };

  const prevHandler = () => {
    if (currentPage <= 1) setCurrentPage(currentPage = pageNumber.length + 1);
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className={styles.Paginated}>
        <li><a href="# " onClick={prevHandler}>&lt;&lt;</a></li>
        {pageNumber &&
          pageNumber.map((number) => (
            <div key={number}>
              <li><a href="# " onClick={() => paginated(number) }>{number}</a></li>
            </div>
          ))}
        <li><a href="# " onClick={nextHandler}>&gt;&gt;</a></li>
        </div>
        <input type="text" id={styles.pageNum} value={currentPage} disabled onChange={()=>{}} />
    </div>
  );
}
