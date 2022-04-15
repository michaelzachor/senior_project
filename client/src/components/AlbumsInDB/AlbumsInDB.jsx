import React, { useState, useEffect, useContext} from 'react';
import "./albumsindb.css";
import axios from "axios";
import Modal from './Modal/Modal'
import {AuthContext} from '../../context/AuthContext'

function AlbumsInDB() {
    // const SERVER_URL = `https://seniorproject-michaelzachor.herokuapp.com/`
    const SERVER_URL = `http://localhost:4000/`

    const [userdb, setUserdb] = useState([]);
    const [modalAlbum, setModalAlbum] = useState(null);
    const [wasClicked, setWasClicked] = useState(false);
    const { user } = useContext(AuthContext);


    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = await axios.get(SERVER_URL+`albums/userdb/${user._id}`) // add userId
            let markedData = [];
            let i = 0;
            while (res.data[i]) {
                if (res.data[i].marked) markedData.push(res.data[i]);
                i++;
            }
            setUserdb(markedData);
        }
        fetchUserdb();
    }, [])
    
    console.log(userdb)
    useEffect(()=>{
        console.log("c: ", wasClicked);
        if (wasClicked) {
            let modal = document.getElementsByClassName("modal")[0];
            modal.style.display = "block";
            setWasClicked(false);
        }
    }, [modalAlbum])

    return (
    <div className='AlbumsInDB'>
        {/* <h2 className='dbSectionTitle'>Recently Logged</h2> */}
        <div className="dbAlbums">
            {userdb && userdb.map((album, i) => (
                <div key={album.spotifyId} className="dbAlbum">
                    <img className="dbAlbumCover" alt="album cover" src={album.img} onClick={() => {
                        setWasClicked(true)
                        setModalAlbum(album);
                    }}>
                    </img>
                </div>
            ))}
        </div>
        <Modal album={modalAlbum} noModalAlbum={() => setModalAlbum(null)} />
    </div>
    )
}

export default AlbumsInDB