import React, { useEffect, useState } from 'react';
import Header from "../components/Header/Header"
import AlbumInfo from "../components/AlbumInfo/AlbumInfo"

function Home() {
    return (
        <div className='Home'>
            <Header />
            <AlbumInfo />
        </div>
    )
}

export default Home;