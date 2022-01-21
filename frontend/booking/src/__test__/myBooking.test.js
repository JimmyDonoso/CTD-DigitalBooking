import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen, waitFor} from '@testing-library/react'
import MyBooking from '../components/MyBookings'
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { store } from "../redux/store/store"
import { Provider } from "react-redux";

describe("Test de pagina Mis reservas", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MyBooking name = "Juan" lastName = "Martin"/>
                </BrowserRouter>
            </Provider >
        )
    })
    test('texto correcto del saludo',() => {
        const elemento = screen.getByText(/Hola, /i);
        expect(elemento).toBeInTheDocument()
    })
    test('texto correcto del title',() => {
        const elemento = screen.getByText(/Mis reservas/i);
        expect(elemento).toBeInTheDocument()
    })
})