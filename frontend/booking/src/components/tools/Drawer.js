import React, { useEffect, useState } from "react";
import style from "../../styles/header.module.css";
import { Link, useHistory } from "react-router-dom";

function Drawer(props){
    const [isLoggedInMenu, setLoggedInMenu] = useState(false);

    const handleLoggedInMenu = () => {
        setLoggedInMenu(!isLoggedInMenu);
      }

    return (
    <div style={props.style} className={style.condicional}>
       <div className={style.btnBox}>
            {props.userRole == "ADMIN" ? (<div className={style.adminBox}>
              <p>Administación </p>
              <div className={style.separador}></div>
            </div>): ""}
            <div className = {style.leyendaUsuarioBox}>
              <p>Hola, </p>
              <p className = {style.leyendaUsuario}> {props.name} {props.lastname}</p>
            </div>           
          </div>
        <div className = {style.letters_box}>
            <p onClick={handleLoggedInMenu} className = {style.letters}>{props.nameLetter}{props.lastnameLetter}</p>
            <div className={isLoggedInMenu ? style.myBookingsActive : style.myBookingsHidden} >
                <Link to={props.zeroLink}  style={{ color: "#FBC02D", textDecoration: 'none' }}><p><i class="fas fa-heart"></i> {props.zeroOption} </p></Link>
                <hr/>
                <Link to={props.link}  style={{ color: "#FBC02D", textDecoration: 'none' }}><p><i class="fas fa-suitcase"></i> {props.action} </p></Link>
                <hr/>
                <p onClick={props.limpiarStorage}><i class="fas fa-sign-out-alt"></i> Cerrar sesión </p>
            </div>
        </div>      
    </div>
    )
}
export default Drawer;