import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import {faTimes, faBars} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import style from "../../styles/header.module.css";

export default function Menu(props){
  const [isMenuOpen, setOpen] = useState(false);

  const handleMenu = () => {
    
    setOpen(!isMenuOpen)
  }

  const handleLogOut = () => {
    handleMenu();
    
    if(props.isAuth){
      props.limpiarStorage();
    }
  }
    
  const burgerIcon = <FontAwesomeIcon icon={faBars} onClick={handleMenu} className={style.burger}/>
  const closeIcon = <FontAwesomeIcon icon={faTimes} onClick={handleMenu} className={style.cross}/>
  

    return(
    <div style={props.style}>
        {isMenuOpen ? closeIcon : burgerIcon}
        <div className={isMenuOpen ? style.menuActive : style.menuHidden}>
            <div className={isMenuOpen ? style.bordeActive : style.bordeHidden}>
              <h4>MENU</h4>
            </div>
            <div className={isMenuOpen ? style.botonesActive : style.botonesHidden}>
            {/* <FontAwesomeIcon icon={faTimes} onClick={handleMenu} className={style.cross} style={{display: isMenuOpen ? "none" : "block"}}/> */}
            {props.isAuth && ( <Link to={props.zeroLink}>
                <button onClick={handleMenu} className={isMenuOpen ? style.buttonActive : style.button}>{props.zeroOption}</button>
              </Link>)}
             {props.isAuth && <hr/>}
              <Link to={props.firstLink}>
                <button onClick={handleMenu} className={isMenuOpen ? style.buttonActive : style.button}>{props.firstOption}</button>
              </Link>
              <hr/>
              <Link to={props.secondLink}>
                <button onClick={handleLogOut} className={isMenuOpen ? style.buttonActive : style.button}>{props.secondOption}</button>
              </Link>
            </div>
          </div>
    </div>
    )}
