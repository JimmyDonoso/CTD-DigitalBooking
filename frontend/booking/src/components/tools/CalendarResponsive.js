import DatePicker, {registerLocale} from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/calendarResponsive.css"
import es from 'date-fns/locale/es';
registerLocale("es", es);


const CalendarResponsive = ({valores, reservedDates, type}) => {

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [months, setMonths] = useState(2);

  const getDates = () => {
    if (reservedDates)
      return reservedDates.map((dateString) => {
        let date = new Date(dateString);
        date.setHours(date.getHours() + 3);
        return date;
      });
    else return [];
  };

  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches){
        setMonths(1);
    }
  }, [])

  return (
    <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          dateFormat="MM/dd/yyyy"
          onChange={(update) => {
            setDateRange(update);
            valores(update);
          }}
          excludeDates={getDates()}
          monthsShown={months}
          inline
          locale="es"
        />
  );
};

export default CalendarResponsive;