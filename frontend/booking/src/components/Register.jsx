import React, {useState} from "react";
import { Link } from "react-router-dom";
import style from "../styles/login.module.css"
import Header from "./tools/Header";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { faHandMiddleFinger } from "@fortawesome/free-solid-svg-icons";
import { URLSERVER } from "../config/index";


const schema = yup
  .object()
  .shape({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    correo: yup
      .string()
      .email("El correo no es valido")
      .required("El correo es requerido"),
    password: yup
      .string()
      .required("La contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        "La contraseña debe tener al menos una mayuscula"
      )
      .matches(/[0-9]/, "La contraseña debe contener al menos un numero")
      .matches(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "La contraseña debe contener al menos un caracter especial"
      ),
    confirmPassword: yup
      .string()
      .required("La contraseña es requerida")
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  })
  .required();

const Register = () => {
  const [showResults, setShowResults] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const showMessage = () => {
    setShowResults(true);
  }

  const userRegister = (data) => {

    axios.post(`${URLSERVER}/users/add`, data)
    .then((res) => {
      
      Swal.fire({
            icon: 'success',
            title: 'Bienvenido!',
            text: 'Se registró correctamente'
          }).then(function() {
            history.push("/login");
          });
      })
    .catch((error) => {
      console.log(error);
      showMessage();
    })
  }

  const onSubmit = (data) => {
    
    let userData = {
      name: data.nombre,
      lastName: data.apellido,
      email: data.correo,
      password: data.password
    }

    userRegister(userData);
     
  };

  return (
    <>
      <Header title="Sentite como en tu hogar" />
      <div className={style.login}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Crear cuenta</h2>
          { showResults ? 
              <p className={style.error}>Lamentablemente no ha podido registrarse. Por favor intente más tarde.</p>  
              : 
              null 
          }

          <div
            className={style.inputContainerDoble}
          >
            <div className={style.inputContainer}>
              <label htmlFor="nombre">Nombre</label>
              <input
                className={style.entry}
                id="nombre"
                type="text"
                {...register("nombre")}
              />
              {errors.nombre && (
                <p className={style.errorMessage}>{errors.nombre.message}</p>
              )}
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="apellido">Apellido</label>
              <input
                className={style.entry}
                id="apellido"
                type="text"
                {...register("apellido")}
              />
              {errors.apellido && (
                <p className={style.errorMessage}>{errors.apellido.message}</p>
              )}
            </div>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="correo">Correo electronico</label>
            <input
              className={style.entry}
              id="correo"
              type="email"
              {...register("correo")}
            />
            {errors.correo && (
              <p className={style.errorMessage}>{errors.correo.message}</p>
            )}
          </div>
          
          <div className={style.inputContainer}>
            <label htmlFor="password" >Contraseña</label>
            <input
              className={style.entry}
              data-testid="input-pass"
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className={style.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              className={style.entry}
              data-testid="input-confirm-pass"
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className={style.errorMessage}>{errors.confirmPassword.message}</p>
            )}
          </div>
          

          {/* Buttons */}
          <input className={style.resetear} type="reset" value="Reiniciar" />
          <input className={style.entrar} type="submit" value="Crear cuenta" />

          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesion</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
