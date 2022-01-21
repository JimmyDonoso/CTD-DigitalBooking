import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "../img/errorIcon.svg";
import style from "../styles/mybookings.module.css";
import Header from "./tools/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Spinner from "./tools/Spinner";
import dateFormat from "dateformat";
import {URLSERVER} from "../config/index"

const MyBookings = (props) => {

  const [bookings, setBookings] = useState([]);
  const [hasBookings, setHasBookings] = useState(false);
  const [loading, setLoading] = useState(true);

  let name = useSelector(state => state.auth.nombre);
  let lastName = useSelector(state => state.auth.apellido);
  let token = useSelector(state => state.auth.token);
  let userId = useSelector(state => state.auth.userId); // traer las bookings por id no funciona, devuelve error de CORS policy
  let email = useSelector(state => state.auth.email);

  const config = {
    headers: { Authorization: token }
  };

  useEffect(() => {
    axios.get(`${URLSERVER}/booking/search/user/${email}`, config)
    .then((res) => {
      setBookings(res.data)
      if (res.data.length > 0) {
        setHasBookings(true)
      }
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    <>
      <Header title="Sentite como en tu hogar" />
      <div>
          <nav className={style.product}>
              <div>
                <h2>¡Hola, {name} {lastName}!</h2>
                <p>Mis reservas</p>
              </div>
              <div>
                <Link to="/"><FontAwesomeIcon icon={faChevronLeft} className={style.faChevronLeft} /></Link>
              </div>
          </nav>
          {loading && <Spinner/>}
          {!loading && 
            <div>
              {!hasBookings ?
                <div className={style.cajaMensaje}>
                  <img className={style.check} src={Error} alt="Error"></img>
                  <h2>Lo sentimos</h2>
                  <p>Aún no has efectuado una reserva.</p>
                  <Link to="/">
                    <button className={style.BotonOk} type="submit">Volver al inicio</button>
                  </Link>
                </div>
                :
                <div className={style.mainContainer}>

                  
                  <table className={style.bookingTable}>
                    <tr className={style.labels}>
                      <th htmlFor="">ID</th>
                      <th htmlFor="">Nombre</th>
                      <th htmlFor="">Categoria</th>
                      <th htmlFor="">Fecha Entrada</th>
                      <th htmlFor="">Fecha Salida</th>
                      <th htmlFor="">Horario Check-In</th>
                    </tr>
                  
                    {bookings.map(book => {
                      return (
                          <tr key={book.id} className={style.bookingRow}> 
                            <td>#{book.id}</td>
                            <td>{book.product.name}</td>
                            <td>{book.product.category.title} </td>
                            <td>{dateFormat(addDays(book.initialBooking ,1) , 'dd/mm/yyyy')}</td>
                            <td>{dateFormat(addDays(book.endBooking, 1), 'dd/mm/yyyy')}</td>
                            <td>{book.bookingTime}</td>
                          </tr>
                      )})}
                  </table>
                </div>
              }
            </div> 
          }               
      </div>
    </>
  );
};


export default MyBookings;