import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen, waitFor} from '@testing-library/react'
import ResultMessage from '../components/ResultMessage'
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { store } from "../redux/store/store"
import { Provider } from "react-redux";

describe("test de resultMessage", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ResultMessage title='Bienvenido!'  description='Se registró correctamente'/>
                </BrowserRouter>
            </Provider>
        )
    })

    test("correcto title", () => {
        const elemento = screen.getByText(/Bienvenido/i)
        expect(elemento).toBeInTheDocument()
    })
    test("Se registro correctamente", () => {
        const elemento = screen.getByText(/Se registró correctamente/i)
        expect(elemento).toBeInTheDocument()
    })
})