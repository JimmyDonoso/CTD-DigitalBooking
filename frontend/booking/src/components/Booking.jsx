import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import style from "../styles/booking.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChevronLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from 'react-redux';
import dateFormat from "dateformat";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./tools/Header";
import CalendarResponsive from "./tools/CalendarResponsive";
import Spinner from "./tools/Spinner";
import { URLSERVER } from "../config/index";

const schema = yup
  .object()
  .shape({
    scheduleSelected: yup
      .string()
      .required("Seleccione un horario"),
    userCity: yup
      .string()
      .required("Ingrese su ciudad"),
  });

const Booking = (props) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { id } = props.match.params;
  const history = useHistory();

  let name = useSelector(state => state.auth.nombre);
  let lastName = useSelector(state => state.auth.apellido);
  let email = useSelector(state => state.auth.email);
  let userId = useSelector(state => state.auth.userId);
  let token = useSelector(state => state.auth.token);

  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [product, setProduct] = useState({});
  const [showDates, setShowDates] = useState(false);
  const hoursAM = [9, 10, 11, 12];
  const hoursPM = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const [bookingData, setBookingData] = useState({
    user: {
      email: email
    },
    product: { id: id },
    bookingTime: "",
    initialBooking: "",
    endBooking: ""
  });

  const [bookings, setBookings] = useState([]);

  const config = {
    headers: { Authorization: token }
  };

  useEffect(() => {
    axios.get(`${URLSERVER}/products/search/${bookingData.product.id}`)
      .then((res) => {
        
        setProduct(res.data)
        setBookingData(prevState => ({
          ...prevState,
          product: { id: id }
        }))
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`${URLSERVER}/booking/search/${bookingData.product.id}`, config)
      .then((res) => {
        setBookings(res.data)
       

      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const onSubmit = () => {

    axios.post(`${URLSERVER}/booking/add`, bookingData, config)
      .then((res) => {
     
        history.push("/booking/successful-booking/");
      })
      .catch((error) => {
        console.log(error);
        showMessage();
      })
   
  
  };

  const handleClickSelect = (e) => {
    setBookingData(prevState => ({
      ...prevState,
      bookingTime: e.target.value,
    }))
  }

  const showMessage = () => {
    setShowResults(true);
  }

  let fullDay = [];
  const valuesDatepicker = (data) => {
    fullDay = data;
    setStartDate(fullDay[0]);

    if (fullDay[1] == null) {
      setEndDate(new Date());
    } else {
      setEndDate(fullDay[1]);
      setShowDates(true);
    }
  
    setBookingData(prevState => ({
      ...prevState,
      initialBooking: dateFormat(fullDay[0], 'yyyy-mm-dd'),
      endBooking: dateFormat(fullDay[1], 'yyyy-mm-dd'),
    }))
  }

  return (
    <>
      <Header title="Sentite como en tu hogar" />
      {loading && <Spinner />}
      {!loading &&
        <div>
          <nav className={style.product}>
            <div>
              <p className={style.category}>{product.category.title}</p>
              <h1>{product.name}</h1>
            </div>
            <div>
              <Link to="/"><FontAwesomeIcon icon={faChevronLeft} className={style.faChevronLeft} /></Link>
            </div>
          </nav>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className={style.booking}>
              <div className={style.mainContainer}>
                <section>
                  <h2 className={style.containerTitle}>Completa tus datos</h2>
                  <div className={style.formContainer}>
                    <div className={style.rowContainer}>
                      <div className={style.inputContainer}>
                        <label className={style.formLabel} htmlFor="">Nombre</label>
                        <input className={style.formInput} id="name" type="text" value={name} disabled />
                      </div>
                      <div className={style.inputContainer}>
                        <label className={style.formLabel} htmlFor="">Correo electronico</label>
                        <input className={style.formInput} id="name" type="text" value={email} disabled />
                      </div>
                    </div>
                    <div className={style.rowContainer}>
                      <div className={style.inputContainer}>
                        <label className={style.formLabel} htmlFor="">Apellido</label>
                        <input className={style.formInput} id="lastName" type="text" value={lastName} disabled />
                      </div>
                      <div className={style.inputContainer}>
                        <label className={style.formLabel} htmlFor="">Ciudad</label>
                        <input className={style.formInput} {...register("userCity")} id="city" type="text" />
                        {errors.userCity && (<p className={style.errorMessage}>{errors.userCity.message}</p>)}
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className={style.containerTitle}>Selecciona tu fecha de reserva</h2>
                  <div className={style.FechasBloque}>
                    <article id="calendarResponsive">
                      <CalendarResponsive reservedDates={product.dateRange} valores={valuesDatepicker} className={style.Calendar} />
                    </article>
                  </div>
                </section>

                <section className={style.arrivalTime}>
                  <h2 className={style.containerTitle}>Tu horario de llegada</h2>
                  <div className={style.containerCheckIn}>
                    <h3><FontAwesomeIcon icon={faCheckCircle} />  Tu habitacion va a estar lista para el check-in entre las 10:00 AM y las 11:00 PM</h3>
                    <p>Indica tu horario estimado de llegada:</p>
                    <select onClick={handleClickSelect} {...register("scheduleSelected")} id="bookingTime" >
                      <option selected disabled value="">Selecciona tu horario</option>
                      {hoursAM.map((i) => <option value={i + ":00"}>{i}:00 AM</option>)}
                      {hoursPM.map((i) => <option value={i + ":00"}>{i}:00 PM</option>)}
                    </select>
                    {errors.scheduleSelected && (<p className={style.errorMessage}>{errors.scheduleSelected.message}</p>)}
                  </div>
                </section>
              </div>


              <div className={style.secondaryContainer}>
              <div className={style.detailContainer}>
                  <h2>Detalle de la reserva</h2>
                  <div>
                    <div className={style.imgContainer}>
                      <img src={product.images[0].image}  alt="imagen" srcset="" />   
                      <div>
                        <div className={style.areaTitle}>
                          <span>{product.category.title}</span>
                          <h3>{product.name}</h3>
                          <div>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                          </div>
                        </div>
                        <p>Ubicado en: {product.address}. {product.city.city}, {product.city.country}</p>
                        <hr/>
                        <div className={style.checks}>
                          <h4>Check In:</h4> 
                          <h5>{showDates ? dateFormat(startDate, 'dd/mm/yyyy') : "../../...."}</h5>
                        </div>   
                        <hr/>
                        <div className={style.checks}>
                          <h4>Check Out:</h4> 
                          <h5>{showDates ? dateFormat(endDate, 'dd/mm/yyyy') : "../../...."}</h5>
                        </div>
                        <hr/>
                          { showResults ? 
                            <p className={style.error}>Lamentablemente la reserva no ha podido realizarse. Por favor, intente más tarde</p>  
                            : 
                            null 
                          }
                        <button type="submit" className={style.confirmBookingBtn}>Confirmar reserva</button>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </form>


          <section className={style.Text}>
            <h2>Qué tenés que saber</h2>
            <hr></hr>
            <article className={style.Info}>
              <div className={style.cajaInfo}>
                <h3>Normas de la casa</h3>
                {/* <ul className={style.Normas} type="none">
                      {listaProductos.map(item => {return <li className={style.itemInfo}>{item.normas.name}</li>})}
                </ul> */}
                <ul className={style.Normas} type="none">
                  <li>Check-out: 10:00</li>
                  <li>No se permiten fiestas</li>
                  <li>No fumar</li>
                </ul>
              </div>
              <div className={style.cajaInfo}>
                <h3>Salud y seguridad</h3>
                {/* <ul className={style.Seguridad} type="none">
                      {listaProductos.map(item => {return <li className={style.itemInfo}>{item.seguridad.name}</li>})}
                </ul> */}
                <ul className={style.Seguridad} type="none">
                  <li>Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus</li>
                  <li>Detector de humo</li>
                  <li>Depósito de seguridad</li>
                </ul>
              </div>
              <div className={style.cajaInfo}>
                <h3>Política de cancelación</h3>
                {/* <ul className={style.Cancelacion} type="none">
                      {listaProductos.map(item => {return <li className={style.itemInfo}>{item.politica.name}</li>})}
                </ul> */}
                <ul className={style.Cancelacion} type="none">
                  <li>Agregá las fechas de tu viaje para obtener los detalles de cancelación de esta estadia.</li>
                </ul>
              </div>
            </article>
          </section>
        </div>}
    </>
  );
};


export default Booking


