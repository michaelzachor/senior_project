import React, { useEffect, useState } from 'react';
import Header from "../components/Header/Header"
import AlbumsInDB from '../components/AlbumsInDB/AlbumsInDB';

function MyMusic() {
    return (
        <div className='MyMusic'>
            <Header />
            <AlbumsInDB />
        </div>
    )
}

export default MyMusic;