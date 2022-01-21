import { Carousel } from 'react-carousel-minimal';
import React, { useState, useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import style from '../../styles/product.module.css';

function Gallery({product, type, styleGallery, galleryState}) {

const handleGallery = () => {
    galleryState();

}

  return (
    (type === "desktop") ? 
        (<div className={styleGallery}>
            <FontAwesomeIcon 
                icon={faTimes} 
                onClick={handleGallery}
                className={style.close} 
            />
            <Carousel
                data={product.images}
                time={3000}
                width="50vw"
                height="60vh"
                slideNumber={true}
                slideNumberStyle={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: 'unset',
                    right: '0.5rem',
                    bottom: '0.5rem'
                }}
                automatic={true}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnails={true}
                thumbnailWidth="17.5%"
                showNavBtn={true}
                style={{
                    height: "100%",
                    textAlign: "center",
                    maxWidth: "50vw",
                    maxHeight: "75vh",
                    margin: "13vh auto",
                    backgroundColor: "white",
                    borderRadius: "10px"
                }}
            />
        </div>)
    :
        (<Carousel
            data={product.images}
            time={3000}
            width="100%"
            height="30rem"
            slideNumber={true}
            slideNumberStyle={{
                fontSize: '1rem',
                fontWeight: 'bold',
                position: 'absolute',
                top: 'unset',
                right: '0.5rem',
                bottom: '0.5rem'
            }}
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={false}
            showNavBtn={false}
            style={{
                textAlign: "center",
                maxWidth: "850px",
                maxHeight: "500px",
                margin: "0 auto",
            }}
        />)

  );
}

export default Gallery;