import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen, fireEvent, within} from '@testing-library/react'
import Product from '../components/Product'
import user from '@testing-library/user-event';
import axios from 'axios';

import Router from "react-router-dom";


jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(selector => selector()),
}));
const createWrapper = () => {
    return render(<Product />);
   };
   
describe("Component Page", () => {
    describe("Rendering", () => {
      it("should render cases container", () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' })
        const wrapper = createWrapper();
        expect(wrapper).toMatchSnapshot();
      });
    });
});

// jest.mock('axios') 

// const mockFake = () => (
//     {
//         data: [
//                 {
//                     id: 1,
//                     name: "Libi",
//                     description: "En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones",
//                 }     
//         ]
    
//     }
// )



// describe("Renderizado de textos", () =>{
//     beforeEach(() => {
//         render(
//             <Product/>
//         );
//     });

//     test('Renderizado del id',async () => {
//         axios.get.mockReturnValueOnce(mockFake);
//         const elemento = await screen.queryByText(/1/i);
//         expect(elemento).toBeInTheDocument();
//     });


//     test('Renderizado del nombre de alojamiento',async () => {
//         axios.get.mockReturnValueOnce(mockFake);
//         const elemento = await screen.queryByText(/Libi/i);
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado H1 titulo tipo de alojamiento',() => {
//         const elemento = screen.queryByText("Hotel");
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado del nombre de alojamiento',() => {
//         const elemento = screen.queryByText("Libi");
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado de la direccion',() => {
//         const elemento = screen.queryByText("Av. San Telmo, San Telmo, Buenos Aires, Argentina");
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado subtitulo del producto',() => {
//         const elemento = screen.queryByText("Libi");
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado de la descripcion',() => {
//         const elemento = screen.queryByText("En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones");
//         expect(elemento).toBeInTheDocument();
//     });

//     test('PENDIENTE Renderizado de las caracteristicas',() => {
//         const elemento = screen.getByRole('list')
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado subtitulo Fechas Disponibles',() => {
//         const elemento = screen.queryByText("Fechas disponibles");
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado texto de reserva',() => {
//         const elemento = screen.getByText(/agregá tus fechas de viaje para obtener precios exactos/i);
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado subtitulo Mapa',() => {
//         const elemento = screen.getByText(/¿dónde vas a estar\?/i)
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado texto de la direccion en el mapa',() => {
//         const elemento = screen.getByText(/av\. san telmo, san telmo, buenos aires, argentina/i);
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado subtitulo de politicas',() => {
//         const elemento = screen.getByText(/qué tenés que saber/i)
//         expect(elemento).toBeInTheDocument();
//     });

//     test('Renderizado subtitulo dos de politicas',() => {
//         const elemento = screen.getByText(/normas de la casa/i);
//         expect(elemento).toBeInTheDocument();
//     });
    

//     test('boton Buscar',() => {
//         screen.getByRole('button', {
//             name: /iniciar reserva/i
//           })
//     })  
// })
