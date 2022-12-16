import React from "react";
import { Link } from "react-router-dom";
import bkgif from "../../assets/bkgif.gif";
import styles from "../LandingPage/LandingPage.module.css";
export default function LandingPage() {
  return (
    <div>
      <img id={styles.img} src={bkgif} alt="" />
      <Link to="/home">
        <button className={styles.btn}>ENTER</button>
      </Link>
      <div className={styles.container}>
      <span>Welcome to the Videogames Bookstore</span>
      </div>
    </div>
  );
}
