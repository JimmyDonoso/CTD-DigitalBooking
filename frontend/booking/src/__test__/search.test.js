import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import Search from '../components/tools/Search'
import user from '@testing-library/user-event';
import { store } from "../redux/store/store"
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

describe("renderizado correcto de textos", () =>{
    beforeEach(() => {
        render(
            
            <Provider store={store}>
                <BrowserRouter>
                    <Search/>
                </BrowserRouter>
            </Provider >
        );
    });

    test('renderizar Titulo correctamente',() => {
        const elemento = screen.queryByText("Encuentra alojamientos en casas y deptos")
        expect(elemento).toBeInTheDocument()
    });

    test('render Subtitulo',() => {
        const elemento = screen.queryByText("Indica tus fechas para ver las ofertas y los precios más recientes");
        expect(elemento).toBeInTheDocument();
    });

    test('boton Buscar',() => {
        const elemento = screen.queryByText("Buscar");
        expect(elemento).toBeInTheDocument();
    });

    test("Correctas opciones de boton Buscas", async() => {
        const buscador = screen.getByTestId('custom-element');
        user.click(buscador);
        await waitFor(() => {
            expect(screen.getByText(/Buenos Aires, Argentina/i)).toBeInTheDocument();
        }) 
    })
})


