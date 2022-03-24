import React, { useState, useEffect} from 'react';
import "./albumsindb.css";
import axios from "axios";
import samplePic from "../../assets/samplePic.jpeg";
import {FaStar} from 'react-icons/fa';

function AlbumsInDB() {
    const [userdb, setUserdb] = useState([]);

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = await axios.get("http://localhost:4000/albums/userdb/6220fc41b82cfe6798c7da50") // add userId
            console.log("data",res.data)
            let markedData = [];
            let i = 0;
            while (res.data[i]) {
                if (res.data[i].marked) markedData.push(res.data[i]);
                i++;
            }
            console.log("newdata",markedData)
            setUserdb(markedData);
        }
        fetchUserdb();
        // console.log("user db rendered")
        console.log("db",userdb);
    }, [])

    console.log("final", userdb)
    return (
    <div className='AlbumsInDB'>
        <h2 className='dbSectionTitle'>Recently Logged</h2>
            <div className='albumsInDB'>
                <ul>
                    {userdb && userdb.map((album, i) => (
                        <li key={i}>
                            <div className='albumTitleArtist'>
                                <span className="albumCoverDB">
                                    <img className="albumCoverSmall" src={samplePic}></img>
                                </span>
                                <span>
                                    <div className="albumTitleDB">{album ? album.title : "loading album title"}</div>
                                    <div>{album ? album.artistNames[0] : "loading album artist"}</div>
                                </span>
                                <span>
                                    {album && [...Array(5)].map((star, i) => {
                                        const rating = album.userData.rating;
                                        // console.log("album: ", album.title, "i: ", i, "rating: ", rating);
                                        return (
                                            <FaStar key={i} color={i+1 <= rating ? '#ffc107' : '#e4e5e9'} />
                                    )})}
                                </span>
                                <span className="plus" onClick={()=> {
                                        let thisEl = document.getElementsByClassName("albumsInDB")[0];
                                        let albumInfoDB = thisEl.getElementsByClassName("albumInfoDB")[i];
                                        if (albumInfoDB.style.display === "none") albumInfoDB.style.display = "block";
                                        else albumInfoDB.style.display = "none";
                                    }}>+</span>
                            </div>
                            <div className='albumInfoDB'>
                                <ul>
                                    {album && album.tracks.map((track, t) => {
                                        // console.log(track);
                                        return (
                                        <li key={t}>
                                            <div className="trackNoNameInfo"> 
                                                <span className="trackNoDB">{t+1}</span>
                                                <span className="trackNameDB">{track.title}</span>
                                                <span className="trackRatingDB">
                                                    {track.userData.rating && [...Array(5)].map((star, s) => {
                                                        const rating_t = track.userData.rating;
                                                        console.log("track: ", track, "tR ", rating_t);
                                                        return (
                                                            <FaStar key={s} color={s+1 <= rating_t ? '#ffc107' : '#e4e5e9'} />
                                                    )})} 
                                                </span> 
                                                <span className="trackTagsDB">{track.marked ? track.userData.tags : "-"}</span>
                                            </div>
                                        </li>
                                    )})}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
    </div>
    )
}

export default AlbumsInDB