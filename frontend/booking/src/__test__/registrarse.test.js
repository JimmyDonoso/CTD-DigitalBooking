import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import Registrarse from '../components/Register'
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "../redux/store/store"


describe("Test de funcionamiento de pagina registro", () => {

    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrarse />
                </BrowserRouter>
            </Provider>
        )
    })

    describe("Ingreso incorrecto de datos", () => {

        test("Alerta al no ingresar nombre de usuario", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
            })
        })

        test("Alerta al no ingresar apellido de usuario", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getByText("El apellido es requerido")).toBeInTheDocument();
            })
        })

        test("No ingreso correo electronico", async () => {
            clickSubmitButton();
    
            await waitFor(() => {
                expect(screen.getByText("El correo es requerido")).toBeInTheDocument();
            })
        })

        test("Alerta al no ingresar constraseña", async () => {
            clickSubmitButton();
            await waitFor(() => {
                expect(screen.getAllByText("La contraseña es requerida")[0]).toBeInTheDocument();
            })
        })

        test("Alerta al ingresar constraseña solo alfabetica", async () => {
            user.type(getPassword(), "Abcdefghi")
            clickSubmitButton() 
   
            await waitFor(() => {
                expect(screen.getByText("La contraseña debe contener al menos un numero")).toBeInTheDocument();
            })
        })

        test("Alerta al ingresar contraseña solo alfabetica sin mayuscula", async() => {
            user.type(getPassword(), "passwordsinmay")
            clickSubmitButton()
 
            await waitFor(() => {
                expect(screen.getByText("La contraseña debe tener al menos una mayuscula")).toBeInTheDocument();
            })
        })

        test("Alerta al ingresar contraseña sin caracter especial", async () => {
            user.type(getPassword(), "Password123")
            clickSubmitButton() 
   
            await waitFor(() => {
                expect(screen.getByText("La contraseña debe contener al menos un caracter especial")).toBeInTheDocument();
            })
        })
 
        test("Alerta la contraseña y su confirmacion no coinciden", async () => {
            user.type(getPassword(), "Password123*")
            user.type(getConfirmPasswor(), "OtraPass!*")
            clickSubmitButton() 
   
            await waitFor(() => {
                expect(screen.getByText("Las contraseñas no coinciden")).toBeInTheDocument();
            })
        })

    })

    
})


function getFirstName() {
    return screen.getByRole('textbox', {
        name: /nombre/i, hidden: true
    })
}

function getLastname() {
    return screen.getByRole('textbox', {
        name: /apellido/i
    })
}

function getEmail(){
    return screen.getByRole('textbox', {
        name: /correo electronico/i
      })
}

function getPassword() {
    return screen.getByTestId('input-pass');
} 

function getConfirmPasswor(){
    return screen.getByTestId("input-confirm-pass")
}


function clickSubmitButton() {
    return user.click(screen.getByRole('button', { name: /crear cuenta/i }));
}


