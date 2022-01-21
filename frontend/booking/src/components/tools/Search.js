import style from "../../styles/search.module.css";
import Calendar from "./CalendarSearch";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../styles/calendarSearch.css";
import {useDispatch} from 'react-redux';
import {aCalendar} from "../../redux/action/calendarAction";
import {useSelector} from 'react-redux';
import dateFormat from "dateformat";
import axios from "axios";
import { URLSERVER } from "../../config/index"

const Search = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  let startDate = useSelector(state => state.calendar.startDate);
  let endDate = useSelector(state => state.calendar.endDate);

  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios.get(`${URLSERVER}/cities`)
    .then((res) => {
     
      setCities(res.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  const requestFilter = (city, initialDate, finishDate) => {
    let params = {city:`${city}`};

    if(initialDate != null && finishDate != null){
      params = { ...params, initialDate: initialDate, endDate: finishDate }
    }

    

    axios.get(`${URLSERVER}/products/searchByDateAndCity`, {params: params})
    .then((res) => {
      
     
      props.callbackList(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    //se selecciona la ciudad diferente de null
    if ((data.cities !== 'null') && (startDate == null || endDate == null)) {
      requestFilter(data.cities);
      props.handleUpdate(data.cities);
      history.replace(`/?city=${data.cities}`);
    }else if((data.cities !== 'null') && (startDate !== null && endDate !== null)){
      requestFilter(data.cities, startDate, endDate);
      props.handleUpdate(data.cities);
      history.replace(`/?city=${data.cities}&&dates=${startDate}&${endDate}`);
    }

    
  };

  let fullDay = [];

  const valuesDatepicker = (data) => {
    fullDay = data;
    
    // dispatch(aCalendar(dateFormat(data[0], 'yyyy-mm-dd'), dateFormat(data[1], 'yyyy-mm-dd')));
    if(data[0] && data[1]){
      dispatch(aCalendar(data[0].toISOString().slice(0,10), data[1].toISOString().slice(0,10)));
    }else{
      dispatch(aCalendar(null, null));
    }
  }


  return (
    <>
      <div className={style.Search}>
        <h1>Encuentra alojamientos en casas y deptos</h1>
        <h3>
          Indica tus fechas para ver las ofertas y los precios más recientes
        </h3>

        <form id="form" onSubmit={handleSubmit(onSubmit)} className={style.container}>
          <div className={style.formCities}>
            <select
              className={style.inputSearch}
              {...register("cities")}
              id="citys"
              data-testid="custom-element"
            >
              <option id="title" className={style.selected} value='null'>
                ¿A donde vamos?
              </option>
              {cities.map(city => 
                  <option value={city.city}>{city.city}, {city.country}</option>
              )}
            </select>
          </div>
          <Calendar valores={valuesDatepicker}/>

          <button className={style.ButtonSearch} type="submit">
            Buscar
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;