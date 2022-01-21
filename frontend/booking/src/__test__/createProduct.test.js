import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import CreateProduct from '../components/CreateProduct'
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "../redux/store/store"

describe("Test página Create product", () => {

    beforeEach(() => {
        render(
        <Provider store={store}>
            <BrowserRouter>
                <CreateProduct/>
            </BrowserRouter>
        </Provider>
        )
    })

    describe("Ingreso incorrecto de datos", () => {

        test("Alerta al no ingresar nombre del product", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
            })
        })
        test("Alerta al no ingresar categoria", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getByText("La categoría es requerida")).toBeInTheDocument();
            })
        })
        test("Alerta al no ingresar dirección", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getByText("La direccion es requerida")).toBeInTheDocument(); 
            })
        })
        test("Alerta al no ingresar ciudad", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getByText("La ciudad es requerida")).toBeInTheDocument(); 
            })
        })
        test("Alerta al no ingresar descripción", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getAllByText("La descripción es requerida")[0]).toBeInTheDocument(); 
            })
        })
        test("Alerta al no ingresar latitud", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getByText("La latitud es requerida")).toBeInTheDocument(); 
            })
        })
        test("Alerta al no ingresar longitud", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getByText("La longitud es requerida")).toBeInTheDocument(); 
            })
        })
        
        test("Alerta al no ingresar imagenes", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getAllByText("El nombre de la imágen es requeridos")[0]).toBeInTheDocument(); 
            })
        })
    })

})
function clickSubmitButton() {
    user.click(screen.getByRole('button', {
        name: /Crear/i
      }));
}