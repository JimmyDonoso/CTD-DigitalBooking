import style from "../../styles/categories.module.css";
import Card from "./Card";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { URLSERVER } from "../../config/index";

function Categories(props) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category");
  const cityURL = searchParams.get("city");
  const city = props.city;
  const dates = searchParams.get("dates");
  const history = useHistory();

  let startDate = useSelector((state) => state.calendar.startDate);
  let endDate = useSelector((state) => state.calendar.endDate);
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector(state => state.auth.userId);
  let isAuth = useSelector(state => state.auth.isAuth);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [original, setOriginal] = useState([]);
  const [recall, setRecall] = useState(false);
  const [loading, setLoading] = useState(true);

  const config = {
      headers: { Authorization: token }
  };

  if (recall) {
    // document.querySelector("#form").reset();
    if (
      original.length !== products.length &&
      category == null &&
      dates == null &&
      cityURL == null
    ) {
      setProducts(original);
    }
  }

  const handleSetter = (listProducts) => {
    setProducts(listProducts);
  };

  useEffect(() => {
    axios
      .get(`${URLSERVER}/categories`)
      .then((res) => {
        setCategories(res.data);
    
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URLSERVER}/products`)
      .then((res) => {
        
        setProducts(res.data);
        setOriginal(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get(`${URLSERVER}/favorites/search/${userId}`, config)
            .then((res) => {
              
            })
            .catch((error) => {
                console.log(error);
            })

    props.callback(handleSetter);
    setRecall(true);
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <div>
          <div className={style.subtitle}>
            <h2>Buscar por tipo de alojamiento</h2>
          </div>
          <div className={style.container}>
            {categories.map((card, index) => (
              <div
                key={index}
                className={style.card}
                onClick={() => {
                  history.replace(`/?category=${card.title}`);
                  setProducts(
                    original.filter(
                      (product) => product.category.title === card.title
                    )
                  );
                }}
              >
                <img src={card.urlImage} alt="imagen categoria" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {!loading && (
        <div className={style.box}>
          <h1 className={style.captionSub}>
            {category
              ? category
              : city && dates
              ? city + " en las fechas " + startDate + " y " + endDate
              : cityURL
              ? cityURL
              : "Recomendado"}
          </h1>
          <div className={style.list}>
            {products.map((card, index) => (
              <Card
                key={card.id}
                img={card.images[0].image}
                category={card.category.title}
                title={card.name}
                city={card.city.city}
                country={card.city.country}
                description={card.description}
                link={card.id}
                featuresSet={card.featuresSet}
                card={card}
                isAuth={isAuth}
                keyFav={card.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
