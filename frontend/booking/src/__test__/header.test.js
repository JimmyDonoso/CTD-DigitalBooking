import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import {render, screen, waitFor} from '@testing-library/react'
import Header from '../components/tools/Header'
import logoImg from "../img/logo1.png"
import { Provider } from "react-redux";
import {store} from "../redux/store/store"

describe("correcto funcionamiento de los textos del Header", () => {
  beforeEach(() => {
    render(
      <Provider store = {store}>
        <BrowserRouter>
          <Header title="Sentite como en tu hogar" nameUser= {null} src= {logoImg}/>
        </BrowserRouter>
      </Provider>
     
  );
  }),

  test('texto correcto del Titulo',() => {
    const elemento = screen.queryByText("Sentite como en tu hogar");
    expect(elemento).toBeInTheDocument();
  }),

  test('texto correcto del boton Iniciar Sesion', () => {
    const [primerElemento, segundoElemento] = screen.queryAllByText("Iniciar sesión");
    expect(primerElemento.textContent).toBe("Iniciar sesión")
    expect(segundoElemento.textContent).toBe("Iniciar sesión")
    
  }),

  test('texto correcto del boton Registrarse', () => {
    const [primerElemento, segundoElemento] = screen.queryAllByText("Registrarse");
    expect(primerElemento.textContent).toBe("Registrarse")
    expect(segundoElemento.textContent).toBe("Registrarse")
    
  })

  test('imagenes correctas del Header', () => {
    const img = screen.getByAltText("imagen del logo")
    expect(img.alt).toBe("imagen del logo")
    })

})


