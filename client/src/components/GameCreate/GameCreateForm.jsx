import { useForm } from "./useForm";
import { useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import allPlatforms from "../../platforms";
import style from "../GameCreate/GameCreateForm.module.css";

const initialForm = {
  name: "",
  description: "",
  released: "",
  rating: "",
  background_image: "",
  platforms: [],
  genre: [],
};

const validationsForm = (form) => {
  let errors = {};

  let regex = /^.{1,500}$/;

  if (!form.name.trim()) {
    errors.name = "Name is required";
  }

  if (!form.description.trim()) {
    errors.description = "Description is required";
  } else if (!regex.test(form.description.trim())) {
    errors.description = "Description must not exceed 500 characters";
  }

  if (!form.rating.length) {
    errors.rating = "Rating is required";
  }

  if (form.rating < 0 || form.rating > 5) {
    errors.rating = "Rating cannot be less than 0 or greater than 5";
  }

  if (!form.platforms.length) {
    errors.platforms = "Platforms is required";
  }
  if (form.background_image) {
    if (!regex.test(form.background_image)) {
      errors.description = "Url must not exceed 500 characters";
    }
  }
  return errors;
};

const GameCreateForm = () => {
  const {
    form,
    errors,
    dispatch,
    handleChange,
    handleSelectGenre,
    handleSelectPlatform,
    handleBlur,
    handleSubmit,
    buttonAct,
  } = useForm(initialForm, validationsForm);

  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  console.log(form);

  return (
    <div className={style.Container}>
      <li>
        <h1>
          <span id={style.Flicker1}>C</span>REATE YO
          <span id={style.Flicker2}>U</span>R GA
          <span id={style.Flicker3}>M</span>E
        </h1>
        <form className={style.Form} onSubmit={(e) => handleSubmit(e)}>
          <div className={style.Name}>
            {errors.name && <p>{errors.name}</p>}
            <input
              type="text"
              value={form.name}
              name="name"
              placeholder="Game name..."
              required
              onBlur={handleBlur}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.Description}>
            {errors.description && <p>{errors.description}</p>}
            <textarea
              cools="50"
              rows="5"
              value={form.description}
              name="description"
              placeholder="Game description..."
              required
              onBlur={handleBlur}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.Rating}>
            {!form.rating.length && <p>{errors.rating}</p>}
            {(form.rating < 0 || form.rating > 5) && <p>{errors.rating}</p>}
            <input
              type="number"
              value={form.rating}
              name="rating"
              placeholder="Rating 0-5"
              onBlur={handleBlur}
              onChange={(e) => handleChange(e)}
            />
          </div>
     
          <div className={style.Url}>
            {errors.background_image && <p>{errors.background_image}</p>}
            <input
              type="text"
              value={form.background_image}
              name="background_image"
              placeholder="Url image..."
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.Genres}>
            <select
              onChange={(e) => handleSelectGenre(e)}
              defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>
                Genres
              </option>
              {genres.map((gen) => (
                <option key={gen.id} value={gen.name}>
                  {gen.name}
                </option>
              ))}
            </select>
          </div>
          <div className={style.Platforms}>
            {!form.platforms.length && <p>{errors.platforms}</p>}
            <select
              defaultValue={"DEFAULT"}
              onChange={(e) => handleSelectPlatform(e)}
              onBlur={handleBlur}
              required
            >
              <option value="DEFAULT" disabled>
                Platforms
              </option>
              {allPlatforms.map((platform) => (
                <option key={platform.id} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
          <div className={style.Date}>
            <input
              type="date"
              value={form.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className={style.BtnCreate} disabled={buttonAct} type="submit">
            CREATE GAME
          </button>
          <Link to="/home">
          <button className={style.BtnBack}>BACK</button>
        </Link>
        </form>
        
      </li>
    </div>
  );
};

export default GameCreateForm;
