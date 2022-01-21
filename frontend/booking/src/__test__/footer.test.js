import React from 'react'
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Footer from '../components/tools/Footer'
import iconFB from "../img/icon facebook.png"
import iconTW from "../img/tweet.png"
import iconLK from "../img/icon linkedin.png"
import iconIG from "../img/icon ig.png"

test('texto correct del Footer',() => {
    render(
        <Footer/>
    );
    const elemento = screen.queryByText("©2021 Digital Booking");
    expect(elemento).toBeInTheDocument();
}) 

test('render correcto de imagenes de redes sociales', () => {
    render(
          <Footer src= {iconFB} src={iconTW} src = {iconLK} src = {iconIG}/>
    )
    const imgFB = screen.getByAltText("facebook")
    const imgTW = screen.getByAltText("twitter")
    const imgIG = screen.getByAltText("instagram")
    const imgLK = screen.getByAltText("linkedin")
    
    expect(imgFB.alt).toBe("facebook")
    expect(imgTW.alt).toBe("twitter")
    expect(imgLK.alt).toBe("linkedin")
    expect(imgIG.alt).toBe("instagram")
})
