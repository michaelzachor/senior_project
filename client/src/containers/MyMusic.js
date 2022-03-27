import React, { useEffect, useState } from 'react';
import Header from "../components/Header/Header"
import AlbumsInDB from '../components/AlbumsInDB/AlbumsInDB';
import "../components/AlbumsInDB/albumsindb.css";

function MyMusic() {
    return (
        <div className='MyMusic'>
            <Header />
            <AlbumsInDB />
        </div>
    )
}

export default MyMusic;