import React, { useState, useEffect } from "react";
import style from "../../styles/card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faWifi,
  faLocationArrow,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { URLSERVER } from "../../config/index";
import {useDispatch} from 'react-redux';
import {aFavorite} from "../../redux/action/FavoriteAction"

function Card(props) {
  const { pathname } = useLocation();
  const history = useHistory();
  const [showMoreText, setShowMoreText] = useState(false);

  let token = useSelector((state) => state.auth.token);
  let isAuth = useSelector((state) => state.auth.isAuth);
  let userId = useSelector(state => state.auth.userId);
  

  const handlerClick = (props) => {
    
    history.push(
      { pathname: `/product/${props.link}` },
      { state: `${props.link}` },
      { card: `${props.card}` }
    );
  };

  let displayText = "";
  let text = "mostrar más";
  if (showMoreText) {
    displayText = props.description;
    text = "mostrar menos";
  } else {
    displayText = props.description.slice(0, 130);
    text = "mostrar más";
  }

  const dispatch = useDispatch()

  const showMore = () => {
    setShowMoreText(!showMoreText);
  };

  const config = {
    headers: { Authorization: token },
  };

  const HandleFavorites = (id) => {
    
      if (isAuth && !props.isFavorite) {
      axios
        .post(`${URLSERVER}/favorites/add`, {
          user: {
            id: userId,
          },
          product: {
            id: id,
          },
        }, config)
        .then((res) => {
          
        })
        .catch((err) => {
          console.log("err es: ", err);
        });
    } else if(isAuth && props.isFavorite){
      dispatch(aFavorite(id))
      axios
      .delete(`${URLSERVER}/favorites/delete/${id}`, config)
      .then((res) => {
        
        history.push(pathname);
      })
      .catch((err) => {
        console.log("err es: ", err);
      });
    } else {
      if (token) {
        history.push(
          { pathname: `/product/${userId}/booking` },
          { state: `${userId}` }
        );
      } else {
        history.push({ pathname: "/login" }, { params: "error" });
      }
    }
  };

  return (
    <>
      <div className={style.card}>
        <div className={style.card_left}>
          <img
            src={props.img}
            className={style.imagen}
            alt="imagen Hotel"
          ></img>
          {props.isFavorite ? (
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => HandleFavorites(props.keyFav)}
              className={style.iconHeart_active}
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => HandleFavorites(props.card.id)}
              className={style.iconHeart}
            />
          )}
        </div>
        <div className={style.card_right}>
          <div className={style.iconBox}>
            <FontAwesomeIcon icon={faStar} className={style.iconoEstrella} />
            <FontAwesomeIcon icon={faStar} className={style.iconoEstrella} />
            <FontAwesomeIcon icon={faStar} className={style.iconoEstrella} />
            <FontAwesomeIcon icon={faStar} className={style.iconoEstrella} />
            <FontAwesomeIcon icon={faStar} className={style.iconoEstrella} />
            <p className={style.category}>{props.category}</p>
          </div>

          <p className={style.title}>{props.title}</p>
          <p className={style.location}>
            {props.city}, {props.country}
          </p>
          <div>
            {props.featuresSet.map((item) => {
              return (
                <i key={item.id} className={style.iconSpace}>
                  <i className={item.icon}></i>
                </i>
              );
            })}
          </div>

          <div className={style.description}>
            {displayText}{" "}
            <span className={style.showMoreBtn} onClick={showMore}>
              {" "}
              {text} . . .{" "}
            </span>
          </div>
          <button
            className={style.buttonCard}
            onClick={() => handlerClick(props)}
          >
            Ver más
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
