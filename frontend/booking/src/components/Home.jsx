import Search from "./tools/Search";
import Categories from "./tools/Categories.js";
import Header from "./tools/Header.js"
import { useEffect, useState } from 'react';


function Home(props) {
    const [city, setCity] = useState(null);
    const [callbackList, setCallbackList] = useState(null);

    const handleUpdate = (newCity) => {
        setCity(newCity);
    }

    const handleCallbackList = (callback) => {
       
        setCallbackList(() => callback);
    }

    useEffect(() => {
        
    }, [callbackList])


    return (
        <>  
            <Header title="Sentite como en tu hogar" />
            <Search handleUpdate = {handleUpdate} callbackList={(props) => callbackList(props)}/>
            <Categories handleUpdate = {handleUpdate} city= {city} callback={handleCallbackList} render={props.render}/>
        </>
    )
}

export default Home;