import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header/Header"
import AlbumInTable from "../components/AlbumInTable/AlbumInTable"
import "../components/AlbumInTable/albumintable.css"
import "./mymusic.css";


function MyMusic() {
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

    function renderTableData(album) {
        return (
            <tr>
                <td>Img</td>
                <td>{album ? album.title : "loading album title"}</td>
                <td>{album ? album.artistNames[0] : "loading album artist"}</td>
                <td>{album ? album.year : "loading album year"}</td>
            </tr>
        )
    }
    return (
        <div className='MyMusic'>
            <Header />
            <h2>Recently Logged</h2>

            <div className='albumsInDB'>
                <ul>
                    {userdb && userdb.map((album, i) => (
                        <li key={i}>
                            <div className='albumTitleArtistYear'>
                                <span>img</span>
                                <span>{album ? album.title : "loading album title"}</span>
                                <span>{album ? album.artistNames[0] : "loading album artist"}</span>
                                <span>{album ? album.year : "loading album year"}</span>
                                <span className="plus" onClick={()=> {
                                        let thisEl = document.getElementsByClassName("albumsInDB")[0];
                                        let albumInfoDB = thisEl.getElementsByClassName("albumInfoDB")[i];
                                        if (albumInfoDB.style.display === "none") albumInfoDB.style.display = "block";
                                        else albumInfoDB.style.display = "none";
                                    }}>+</span>
                            </div>
                            <div className='albumInfoDB'>
                                <ul>
                                    {album && album.tracks.map((track, i) => (
                                        <li key={i}>
                                            <div className="trackNoNameInfo"> 
                                                <span className="trackNo">{i+1}</span>
                                                <span className="trackName">{track.title}</span>
                                                <span className="trackRating">{track.marked ? track.userData.rating : "-"}</span>
                                                <span className="trackTags">{track.marked ? track.userData.tags : "-"}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

{/*
            <table>
            {userdb && userdb.map((album, i) => (
                <tbody key={i}>
                    {renderTableData(album)}
                    <AlbumInTable album={album}/>
                </tbody>
            ))}
            </table>
            */}
        </div>
    )
}

export default MyMusic;