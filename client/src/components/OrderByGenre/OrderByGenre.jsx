import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByGenre } from "../../redux/actions";

export default function FilterGenre({ currentPage, setCurrentPage }) {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  function handleSelect(e) {
    e.preventDefault();
    dispatch(orderByGenre(e.target.value));
    setCurrentPage(currentPage = 1)
    console.log(e.target.value);
  }
  return (
    <select defaultValue={"DEFAULT"} onChange={(e) => handleSelect(e)}>
      <option value="DEFAULT" disabled>
        Genres
      </option>
      {genres &&
        genres.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
    </select>
  );
}
