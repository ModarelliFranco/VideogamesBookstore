import React from "react";
import styles from '../Loading/LoadingCards.module.css'

export default function LoadingCard (){
return(
    <div className={styles.Loading}>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
    </div>
    
)
    

}