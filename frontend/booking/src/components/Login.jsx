import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import style from "../styles/login.module.css";
import Header from "./tools/Header";
import {useDispatch} from 'react-redux'
import { yupResolver } from "@hookform/resolvers/yup";
import {aLogin} from "../redux/action/loginAction"
import * as yup from "yup";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { useSelector} from 'react-redux';
import {URLSERVER} from "../config/index"

const schema = yup
  .object()
  .shape({
    correo: yup
      .string()
      .email("Asegurese de introducir un correo valido")
      .required("Este campo es obligatorio"),
    password: yup.string().required("Este campo es obligatorio"),
  })
  .required();

const Login = () => {
  const location = useLocation();
  const error = location.state;
  const [showResults, setShowResults] = React.useState(false);
  const history = useHistory();
  let isLoggedIn = useSelector(state => state.auth.isAuth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const showMessage = () => {
    setShowResults(true);
  }

  const dispatch = useDispatch()

  const userLogin = (data) => {
   
    axios.post(`${URLSERVER}/users/login`, data)
    .then((res) => {
     
      //guardar en cookie data
      document.cookie = `token=${res.data.token}; max-age=${60 * 60}`;
      //dispatch(aLogin(res.data)
      dispatch(aLogin(res.data.name, res.data.lastName, res.data.token, res.data.email,res.data.id,res.data.rol));
      history.push("/");
    })
    .catch((error) => {
      console.log(error);
      showMessage();
    })
  }


  const onSubmit = (data) => {
   
    let userData = {
      email: data.correo,
      password: data.password
    }

    //envia los datos al axios
    userLogin(userData);
  };


  return (
    <>
      <Header title="Sentite como en tu hogar" />
      <div className={style.login}>
          { (!isLoggedIn && error !== undefined)? 
              <div className={style.errorBlock}>
                <p className={style.loginRequired}><FontAwesomeIcon icon={faExclamationCircle} className={style.faExclamationCircle}/> El login es obligatorio. En caso de no estar registrado, puede registrarse.</p>  
              </div>
              : 
              null 
          }
        <form onSubmit={handleSubmit(onSubmit)}>

          <h2>Iniciar sesión</h2>
          { showResults ? 
              <p className={style.error}>Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde.</p>  
              : 
              null 
          }

          <div className={style.inputContainer}>
            <label htmlFor="correo">Correo electronico</label>
            <input
              className={style.entry}
              id="correo"
              type="text"
              {...register("correo")}
            />
            {errors.correo && (
              <p className={style.errorMessage}>{errors.correo.message}</p>
            )}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="password">Contraseña</label>
            <input
              className={style.entry}
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className={style.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          <input className={style.resetear} type="reset" value="Reiniciar" />
          <input className={style.entrar} type="submit" value="Ingresar" />

          <p>
            ¿Aún no tenes cuenta? <Link to="/register"> Registrate</Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;


