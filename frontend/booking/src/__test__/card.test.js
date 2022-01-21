import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen, waitFor} from '@testing-library/react'
import Card from '../components/tools/Card'
import img from "../../public/img/imgHotel.png"
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { store } from "../redux/store/store"
import { Provider } from "react-redux";

describe("Test de card", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Card title="Hotel Manantiales" country = "Argentina" city="Buenos Aires" description="Muy lindo hotel"
                    featuresSet= {[]} />
                </BrowserRouter>
            </Provider >
        )
    })
    test('render correcto de la imagen de la Card', () => {
        const elemento = screen.getByAltText("imagen Hotel")
        expect(elemento.alt).toBe("imagen Hotel")
    })
    
    test('texto correcto del title de la Card',() => {
        const elemento = screen.queryByText("Hotel Manantiales");
        expect(elemento).toBeInTheDocument();
    })  
     
    test('texto correcto de la location de la Card',() => {
        const elemento = screen.queryByText("Buenos Aires, Argentina"); 
        expect(elemento).toBeInTheDocument();
    }) 
    
    test('texto correcto de la description de la Card',() => {
        const elemento = screen.queryByText("Muy lindo hotel");
        expect(elemento).toBeInTheDocument();
    }) 
    
    test("renderizado correcto boton Ver más", () => {
        const elemento = screen.queryByText("Ver más");
        expect(elemento).toBeInTheDocument();
    })

    test("renderizado correcto boton Ver menos", async() => {
        clickMostrarMas();
        await waitFor(() => {
            expect(screen.getByText(/mostrar menos/i)).toBeInTheDocument();
        })
    })
    test("renderizado correcto boton Mostrar más", () => {
        expect(screen.getByText(/mostrar más/i)).toBeInTheDocument();
    })
})


function clickMostrarMas(){
    return user.click(screen.getByText(/mostrar más.../i)); 
}


