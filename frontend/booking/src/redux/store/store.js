import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import {loginReducer} from "../reducer/loginReducer";
import {logoutReducer} from "../reducer/logoutReducer";
import { calendarReducer } from "../reducer/calendarReducer";
import { favoriteReducer } from "../reducer/FavoriteReducer";

const reducers = combineReducers({
  auth: loginReducer,
  logout: logoutReducer,
  calendar: calendarReducer,
  favorite: favoriteReducer

});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
