import styles from './Card.module.scss'
import React from 'react';
import {BrowserRouter as Router } from "react-router-dom"

function Card({ title, imageURL, price, onFavorite ,onPlus }){
  // const onClickButton = () =>{
  //   alert(props.title)
  // }

  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavourite, setIsFavourite] = React.useState(false);

  const onClickfavourite = () => {
    setIsFavourite(!isFavourite)
    onFavorite({title, imageURL, price});
  }

  const onClickPlus = () => {
    onPlus({title, imageURL, price});
    setIsAdded(!isAdded);
  }

  return(
    <div className={styles.card}>
      <div className={styles.favourite}>
        <img onClick={onClickfavourite} src={isFavourite ? "/img/like-active.svg" : "/img/like.svg"} alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageURL} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img className={styles.plusBtn} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
      </div>
    </div>
  );
}
export default Card;