import logoImg from "../../img/logo1.png";
import style from "../../styles/header.module.css";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {aLogout} from '../../redux/action/logOutAction'
import Menu from "./Menu";
import Drawer from "./Drawer";

function Header(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  let isAuth = useSelector(state => state.auth.isAuth);
  let userId = useSelector(state => state.auth.userId);
  let userRole = useSelector(state => state.auth.role);
  
 
  let nameUser = {
    nombre: useSelector(state => state.auth.nombre),
    apellido: useSelector(state => state.auth.apellido),
  };
  

  const limpiarStorage = (e) => {
    if(e){e.preventDefault();}
    
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    dispatch(aLogout());
    window.location.reload();
  };

  const [viewType, setViewType] = useState();

  const handleBookings = () => {
     (userRole === "USER") ? (
        history.push({pathname:`/user_id/${userId}/mybookings`})
     ) : (
        history.push({pathname:`/create-product`})
     )
  } 

  const handleCreateProduct = () =>{
    history.push({pathname:`/create-product`});
  }

  

  const handleResize = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setViewType("desktop");
    } else {
      setViewType("mobile");
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [])
  

  return (
    <nav className={style.header}>
      <div className={style.header_box}>
        <Link to="/">
          <img className={style.logo} src={logoImg} alt="imagen del logo" />
        </Link>
        <Link to="/" className={style.leyenda}>
          {props.title}
        </Link>
      </div>

      {!isAuth ? (
          <>
            <div className={style.btnBoxUnlog} style={{display: viewType === "desktop" ? 'unset' : 'none'}}>            
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <button className={style.button} style={{display: window.location.pathname === "/register" ? 'none' : 'unset' }}>Registrarse</button>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <button className={style.button}  style={{display: window.location.pathname === "/login" ? 'none' : 'unset' }}>Iniciar sesión</button>
                </Link>
            </div>

          <Menu isAuth={isAuth} firstLink="/login" firstOption="Iniciar sesión" secondLink="/register" secondOption="Registrarse" style={{display: viewType === "mobile" ? 'unset' : 'none' }}/>
          
        </>
      ) : (userRole === "USER" ? 
            (<>
                <Drawer 
                    style={{display: viewType === "desktop" ? 'flex' : 'none'}}
                    userRole={userRole} 
                    name={nameUser.nombre}
                    lastname={nameUser.apellido}
                    nameLetter={nameUser.nombre[0]}
                    lastnameLetter={nameUser.apellido[0]}
                    zeroLink={`/myfavorites`} 
                    zeroOption={"Mis favoritos"}
                    link={`/user_id/${userId}/mybookings`}
                    action="Mis reservas"
                    limpiarStorage={limpiarStorage}
                />
                <Menu isAuth={isAuth} limpiarStorage={limpiarStorage} zeroLink={`/myfavorites`} zeroOption="Mis favoritos" firstLink={`/user_id/${userId}/mybookings`} firstOption="Mis reservas" secondLink="/" secondOption="Cerrar sesión" style={{display: viewType === "mobile" ? 'unset' : 'none' }}/>    
            </>) 
            : 
            (<>
                <Drawer 
                    style={{display: viewType === "desktop" ? 'flex' : 'none'}}
                    userRole={userRole} 
                    name={nameUser.nombre}
                    lastname={nameUser.apellido}
                    nameLetter={nameUser.nombre[0]}
                    lastnameLetter={nameUser.apellido[0]}
                    zeroLink={`/myfavorites`} 
                    zeroOption={"Mis favoritos"}
                    link="/create-product"
                    action="Crear alojamiento"
                    limpiarStorage={limpiarStorage}
                />
                <Menu isAuth={isAuth} limpiarStorage={limpiarStorage} zeroLink={`/myfavorites`} zeroOption="Mis favoritos" firstLink="/create-product" firstOption="Crear alojamiento" secondLink="/" secondOption="Cerrar sesión" style={{display: viewType === "mobile" ? 'unset' : 'none' }}/>    
            </>))
      }
    </nav>
  );
}
export default Header;
