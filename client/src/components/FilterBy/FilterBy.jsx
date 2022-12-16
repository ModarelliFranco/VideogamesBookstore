import React from "react";
import { useDispatch } from "react-redux";
import { filterCreated } from "../../redux/actions";

export default function Filter() {
  const dispatch = useDispatch();

  function handlerFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  return (
    <select onChange={(e) => handlerFilterCreated(e)}>
      <option value="all">All games</option>
      <option value="api">Existing games</option>
      <option value="db">Created games</option>
    </select>
  );
}
