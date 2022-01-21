import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../components/Register.jsx";
import Home from "../components/Home.jsx";
import Login from "../components/Login.jsx";
import Product from "../components/Product.jsx";
import Booking from "../components/Booking.jsx";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import styles from "../styles/app.module.css";
import Footer from "../components/tools/Footer";
import { useSelector } from "react-redux";
import createProduct from "../components/CreateProduct.jsx";
import MyBookings from "../components/MyBookings.jsx";
import ResultMessage from "../components/ResultMessage.jsx";
import MyFavorites from "../components/MyFavorites.jsx";

// usar privaterouter para rutas privadas (necesita token)
// usar publicrouter para rutas publicas (ocultar las vistar al estar logueado)
// usar Router para las rutas siempre publicas

const App = () => {
  let isLoggedIn = useSelector((state) => state.auth.isAuth);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home render={true} />
        </Route>
        <PublicRouter
          exact
          path="/register"
          component={Register}
          isAuthenticated={isLoggedIn}
        />
        <PublicRouter
          extact
          path="/login"
          component={Login}
          isAuthenticated={isLoggedIn}
        />
        <Route exact path="/product/:id" component={Product} />
        <PrivateRouter
          exact
          path="/product/:id/booking"
          component={Booking}
          isAuthenticated={isLoggedIn}
        />
        <PrivateRouter
          exact
          path="/booking/successful-booking/"
          isAuthenticated={isLoggedIn}
        >
          <ResultMessage
            title="¡Muchas gracias!"
            description="Su reserva se ha realizado con éxito"
          />
        </PrivateRouter>
        <PrivateRouter
          exact
          path="/create-product"
          component={createProduct}
          isAuthenticated={isLoggedIn}
        />
        <PrivateRouter
          exact
          path="/create-product/successful-ad/"
          isAuthenticated={isLoggedIn}
        >
          <ResultMessage
            title="¡Felicitaciones!"
            description="Su hospedaje se ha creado con éxito"
          />
        </PrivateRouter>
        <PrivateRouter
          exact
          path="/user_id/:id/mybookings"
          isAuthenticated={isLoggedIn}
          component={MyBookings}
        />
        <PrivateRouter
          exact
          path="/myfavorites"
          isAuthenticated={isLoggedIn}
          component={MyFavorites}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
