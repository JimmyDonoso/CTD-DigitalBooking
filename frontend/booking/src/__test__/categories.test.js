import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen, waitFor} from '@testing-library/react'
import Categories from '../components/tools/Categories'
import img from "../../public/img/imgHotel.png"
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { store } from "../redux/store/store"
import { Provider } from "react-redux";
import { useEffect, useState } from 'react';



describe("Test del componente categoria", () => {
    
    beforeEach(() => {
        
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Categories />
                </BrowserRouter>
            </Provider >
        )
    })

    test("renderizado correcto de titulo", () => {
        const elemento = screen.queryByText("Buscar por tipo de alojamiento");
        expect(elemento).toBeInTheDocument();
    })
})