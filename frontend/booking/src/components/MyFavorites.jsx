import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "../img/errorIcon.svg";
import style from "../styles/myFavorites.module.css";
import Header from "./tools/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Spinner from "./tools/Spinner";
import dateFormat from "dateformat";
import { useSelector } from 'react-redux';
import { URLSERVER } from "../config/index"
import Card from "./tools/Card";


const MyFavorites = (props) => {

    const [products, setProducts] = useState([]);
    const [hasFavorites, sethasFavorites] = useState(false);
    const [loading, setLoading] = useState(true);

    let name = useSelector(state => state.auth.nombre);
    let lastName = useSelector(state => state.auth.apellido);
    let token = useSelector(state => state.auth.token);
    let userId = useSelector(state => state.auth.userId); // traer las bookings por id no funciona, devuelve error de CORS policy
    let email = useSelector(state => state.auth.email);
    let FavState = useSelector(state => state.favorite);
    let idFav = FavState.stateFav

    const config = {
        headers: { Authorization: token }
    };

    useEffect(() => {
    
        axios.get(`${URLSERVER}/favorites/search/${userId}`, config)
            .then((res) => {
                setProducts(res.data)
           

                if (res.data.length > 0) {
                    sethasFavorites(true)
                }
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);



    return (
        <>
            <Header title="Sentite como en tu hogar" />
            <div>
                <nav className={style.product}>
                    <div>
                        <h2>¡Hola, {name} {lastName}!</h2>
                        <p>Mis favoritos</p>
                    </div>
                    <div>
                        <Link to="/"><FontAwesomeIcon icon={faChevronLeft} className={style.faChevronLeft} /></Link>
                    </div>
                </nav>
                {loading && <Spinner />}
                {!loading &&
                    <div>
                        {!hasFavorites ?
                            <div className={style.cajaMensaje}>
                                <img className={style.check} src={Error} alt="Error"></img>
                                <h2>Lo sentimos</h2>
                                <p>Aún no has agregado algún favorito.</p>
                                <Link to="/">
                                    <button className={style.BotonOk} type="submit">Volver al inicio</button>
                                </Link>
                            </div>
                            :
                            <div >
                                <div className={style.box}>
                                    <div className={style.list}>
                                        {products.map((card, index) => (
                                            <Card
                                                key={card.product.id}
                                                img={card.product.images[0].image}
                                                category={card.product.category.title}
                                                title={card.product.name}
                                                city={card.product.city.city}
                                                country={card.product.city.country}
                                                description={card.product.description}
                                                link={card.product.id}
                                                featuresSet={card.product.featuresSet}
                                                card={card.product}
                                                isFavorite={FavState.stateFav === card.id ? false : true}
                                                keyFav={card.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    );
};


export default MyFavorites;