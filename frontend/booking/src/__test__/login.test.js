import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from '../components/Login'
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "../redux/store/store"
import { login } from "../redux/reducer/loginReducer"
import { types } from "../redux/types/types"


describe("Inicio correcto de sesion", () => {
    let location = ""
    const initialState = {
        nombre: '',
        apellido: '',
        token: null,
        isAuth: false,
        email: null,
        userId: null
    }
    
    beforeEach(() => {
        render(
            <Login  />
        )
    })

    test("Ingreso de correo electronico correcto", () => {

        const action = {
            type: types.login,
            payload: {
                nombre: 'usuario',
                apellido: 'ejemplo',
                token: "abc12345",
                isAuth: true,
                email: "user@gmail.com",
                userId: 1
            }
        }

        const stateLogin = login({
            nombre: 'usuario',
            apellido: 'ejemplo',
            token: "abc12345",
            isAuth: true,
            email: "user@gmail.com",
            userId: 1
        }, action)
 
        expect(stateLogin.toEqual({
            nombre: 'usuario',
            apellido: 'ejemplo',
            token: "abc12345",
            isAuth: true,
            email: "user@gmail.com",
            userId: 1
        }))
    })
 
    test("Cierre de sesion correcto", () => {
        const action = { type: types.logout }
        const state = login(initialState, action)
        expect(state).toEqual(initialState)
    })

    describe("Renderizado correcto de componentes", () => {

        test("Renderizado correcto de Iniciar Sesion", () => {
            const elemento = screen.queryByText("Iniciar sesión");
            expect(elemento).toBeInTheDocument();
        })
        test("Renderizado correcto de Correo electronico", () => {
            const elemento = screen.queryByText("Correo electronico");
            expect(elemento).toBeInTheDocument();
        })
        test("Renderizado correcto de Password", () => {
            const elemento = screen.queryByText("Contraseña");
            expect(elemento).toBeInTheDocument();
        })
        test("Renderizado correcto de Reiniciar button", () => {
            const elemento = screen.queryByText("Reiniciar");
            expect(elemento).toBeInTheDocument();
        })
        test("Renderizado correcto de Ingresar button", () => {
            const elemento = screen.queryByText("Ingresar");
            expect(elemento).toBeInTheDocument();
        })
        test("Renderizado correcto de Registrate", () => {
            const elemento = screen.queryByText("Registrate");
            expect(elemento).toBeInTheDocument();
        })
    })

})

function getFirstName() {
    return screen.getByRole('textbox', {
        name: /nombre/i, hidden: true
    })
}
