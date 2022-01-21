import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen, fireEvent, within} from '@testing-library/react'
import Booking from '../components/Booking'
import Product from '../components/Product'
import user from '@testing-library/user-event';
 
describe("renderizado correcto de textos", () =>{
    beforeEach(() => {
        render(
            <>
              <Booking/>
            </>
        );
    }),

    test("render Datos correctamente", () => {
      const elemento = screen.getByText("Completa tus datos");
      expect(elemento).toBeInTheDocument();
    });

    test("render Nombre", () => {
      const elemento = screen.getByText("Nombre") 
      expect(elemento).toBeInTheDocument();
    });

    test("render de correo electrónico", () => {
      const elemento = screen.getByText("Correo electronico");
      expect(elemento).toBeInTheDocument();
    });

    test("render de apellido", () => {
      const elemento = screen.getByText("Apellido");
      expect(elemento).toBeInTheDocument();
    });

    test("render de ciudad", () => {
      const elemento = screen.getByText("Ciudad");
      expect(elemento).toBeInTheDocument();
    });

});

