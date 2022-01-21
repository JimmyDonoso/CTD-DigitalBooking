import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker,InfoWindow } from 'react-google-maps';

const MapContainer = (props) => {

    

    return(
        <GoogleMap 
            defaultZoom={15}
            defaultCenter={{ lat: props.lat, lng: props.lng }}  
        >
            <Marker position={{ lat: props.lat, lng: props.lng }} >
                <InfoWindow position={{ lat: (props.lat + 0.0014 ), lng: props.lng }}>
                    <div>
                        <h1>{props.name}</h1>
                        <p>{props.address}</p>
                    </div>
                </InfoWindow>
            </Marker>
        </GoogleMap>
    );
}
export default withScriptjs(
    withGoogleMap(
        MapContainer
    )
);

