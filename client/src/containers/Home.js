import React, { useEffect, useState } from 'react';
import Header from "../components/Header/Header";
import AlbumInfo from "../components/AlbumInfo/AlbumInfo";
import "../components/AlbumInfo/albuminfo.css";

function Home() {

    const [bgImg, setBgImg] = useState();

    return (
        <div className='Home'
             style={{backgroundImage: bgImg}}>
            <Header />
            <AlbumInfo 
                changeBgImg={bgImg => setBgImg(`url("`+bgImg+`")`)}
            />
        </div>
    )
}

export default Home;