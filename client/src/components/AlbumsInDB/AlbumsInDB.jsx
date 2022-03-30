import React, { useState, useEffect} from 'react';
import "./albumsindb.css";
import axios from "axios";
import Modal from './Modal/Modal'

function AlbumsInDB() {
    const [userdb, setUserdb] = useState([]);
    const [modalAlbum, setModalAlbum] = useState(null);
    const [wasClicked, setWasClicked] = useState(false);

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = await axios.get("https://seniorproject-michaelzachor.herokuapp.com/albums/userdb/6220fc41b82cfe6798c7da50") // add userId
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
        <h2 className='dbSectionTitle'>Recently Logged</h2>
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