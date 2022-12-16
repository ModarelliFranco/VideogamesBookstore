import React from "react";
import styles from "../Error/Error.module.css"

function handleClick (){
    window.location.reload(false);
}
export default function Error({error}){
return(
    <div className={styles.Error}>
    <h4> {error} </h4>
          <button onClick={handleClick} >BACK</button>
    </div>
)
}