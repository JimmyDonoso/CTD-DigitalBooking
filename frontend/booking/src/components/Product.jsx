import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import style from "../styles/product.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./tools/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareAlt, faHeart, faMapMarkerAlt, faStar,faBath,
   faChevronLeft, faWifi,faBed, faSwimmer,faUmbrellaBeach, 
   faTv, faGlassCheers, faUtensils, faCity, faBus
} from "@fortawesome/free-solid-svg-icons";
import CalendarResponsive from "./tools/CalendarResponsive";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapContainer from "./tools/MapContainer.js";
import Gallery from "./tools/Gallery";
import axios from 'axios';
import { useSelector} from 'react-redux';
import Spinner from "./tools/Spinner";
import { URLSERVER } from "../config/index"


const Product = (props) => {
  /* const {state} = props.location.state;
  console.log(state); */
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [styleGallery, setStyleGallery] = useState(style.galleryHidden);
  const [viewType, setViewType] = useState();
  const history = useHistory();
  let token = useSelector(state => state.auth.token);

  const handleGallery = (e) => {
    if(e){
      setStyleGallery(style.galleryActive)
    }else{
      setStyleGallery(style.galleryHidden)
    };
  }

  const handleResize = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setViewType("desktop");
    } else {
      setViewType("mobile");
    }
  }

  const handlerClick = () => {
    if(token){
      history.push({pathname:`/product/${id}/booking`}, {state: `${props.link}`});
    }else{
      history.push({pathname:"/login"}, {params: "error"});
    }
  }


  useEffect(() => {
    axios.get(`${URLSERVER}/products/search/${id}`)
      .then((res) => {
        setProduct(res.data)
        setLoading(false)
        
      })
      .catch((error) => {
        console.log(error);
      })
      handleResize();
      window.addEventListener("resize", handleResize);
    }, []);

    let fullDay = [];
    const valuesDatepicker = (data) => {
      fullDay = data;
    
    }
  
    return (
      <>
        <Header title="Sentite como en tu hogar" />
        {loading && <Spinner/>}
        {!loading && 
        <div>
          <nav className={style.product}>
            <div>
              <p className={style.category}>{product.category.title}</p>
              <h1>{product.name}</h1>
            </div>
            <div>
              <Link to="/"><FontAwesomeIcon icon={faChevronLeft} className={style.faChevronLeft}/></Link>
            </div>
          </nav>
          
          <div className={style.subInfo}>
            <div className={style.location}>
              <FontAwesomeIcon icon={faMapMarkerAlt}/>
              <p>{product.address}, {product.city.city}, {product.city.country}</p>
            </div>
            <div className={style.rating}>
              <div>
                <p>Muy bueno</p>
                <div>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                </div>
              </div>
              <div className={style.score}>
                8
              </div>
            </div> 
          </div>
          <div className={style.icons}>
            <FontAwesomeIcon icon={faShareAlt}/>
            <FontAwesomeIcon icon={faHeart}/>
          </div>
          {/* Seccion galeria */}
          <Gallery product={product} type={viewType} styleGallery={styleGallery} galleryState={handleGallery} />
          <section className={style.images}>
            <div className={style.mainImage}>
              <img src={product.images[0].image} />
            </div>
            <div className={style.otherImages}>
              {product.images.slice(1, 5).map((image, index) => {
                return (
                  <div className={style.secondaryImgContainer} >
                    <img
                      src={image.image}
                      key={"img-" + index}
                      className={style.imgGalleryDesktop}
                    />
                  </div> 
                );
              })}
            </div>
            <button type="button" onClick={handleGallery} className={style.seeMore} value="Ver más">Ver más</button>
          </section>

          <section className={style.text}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </section>

          <section className={style.text}>
            <h2>Servicios</h2>
            <hr></hr>
            <ul className={style.features} type="none">
              {product.featuresSet.map(item => {return <li key={item.id} className={style.feature}> <i className={item.icon}></i> {item.name}</li>})}
            </ul>
          </section>

          <section className={style.date}>
            <h2>Fechas disponibles</h2>
            <div className={style.datePicker}>
            <article id="calendarResponsive">
                <CalendarResponsive reservedDates={product.dateRange} valores={valuesDatepicker} />
            </article>
            <article className={style.booking}>
                <div>
                  <p>Agregá tus fechas de viaje para obtener precios exactos</p>
                  <button className={style.buttonBooking} onClick={handlerClick}>Iniciar reserva</button>
                </div>
            </article>
            </div>
          </section>

          <section className={style.text}>
            <h2>¿Dónde vas a estar?</h2>
            <hr></hr>
            <p>{product.address}, {product.city.city}, {product.city.country}</p>
            {/* //GOOGLE MAPS CON CONEXION A LA API */}
            {/* latitude: 4.65297, lngth: -74.0581 */}
            <Wrapper apiKey={"AIzaSyCVIdgmtP7NUKv8m_xNZmBIgAml75OQ4Do"}>
              <MapContainer 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCVIdgmtP7NUKv8m_xNZmBIgAml75OQ4Do`}
                containerElement= {<div style={{height: "70vh"}}/>}
                mapElement={<div style={{height: "100%"}}/>}
                lat={product.latitude}
                lng={product.longitude}
                address={product.address}
                name={product.name}
                loadingElement={<p>Cargando</p>}
              />
            </Wrapper>
          </section>

          <section className={style.text}>
            <h2>Qué tenés que saber</h2>
            <hr></hr>
            <article className={style.info}>
              <div className={style.infoBlock}>
                <h3>Normas de la casa</h3>
                {/* <ul className={style.rules} type="none">
                      {listaProductos.map(item => {return <li className={style.itemInfo}>{item.normas.name}</li>})}
                </ul> */}
                <ul className={style.rules} type="none">
                  <li>Check-out: 10:00</li>
                  <li>No se permiten fiestas</li>
                  <li>No fumar</li>
                </ul>
              </div>
              <div className={style.cajaInfo}>
                <h3>Salud y seguridad</h3>
                {/* <ul className={style.rules} type="none">
                      {listaProductos.map(item => {return <li className={style.itemInfo}>{item.seguridad.name}</li>})}
                </ul> */}
                <ul className={style.rules} type="none">
                  <li>Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus</li>
                  <li>Detector de humo</li>
                  <li>Depósito de seguridad</li>
                </ul>
              </div>
              <div className={style.rules}>
                <h3>Política de cancelación</h3>
                {/* <ul className={style.rules} type="none">
                      {listaProductos.map(item => {return <li className={style.itemInfo}>{item.politica.name}</li>})}
                </ul> */}
                <ul className={style.rules} type="none">
                  <li>Agregá las fechas de tu viaje para obtener los detalles de cancelación de esta estadia.</li>
                </ul>
              </div>
            </article>
          </section>
        </div>}
      </>
    );
  };
  
  
  export default Product;

  