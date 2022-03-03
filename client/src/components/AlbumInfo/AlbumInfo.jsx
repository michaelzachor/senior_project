import React, { useState, useEffect} from 'react';
import EachAlbum from "../EachAlbum/EachAlbum"
import "./albuminfo.css";
import axios from "axios";
/* FLIP
const cards = document.querySelectorAll(".albumContent");

function flipCard() {
    this.classList.toggle("flip");
}
cards.forEach((card) => card.addEventListener("click", flipCard));
const a = document.getElementsByClassName
*/

// document.getElementsByClassName("albumCover")[0].addEventListener("click", showMore)

function AlbumInfo() {
    const [userdb, setUserdb] = useState([]);

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = await axios.get("http://localhost:4000/albums/userdb/621e3c3ff8db05b397dfe262") // add userId
            console.log(res.data)
            setUserdb(res.data);
        }
        fetchUserdb();
        // console.log("user db rendered")
        console.log(userdb);
    },[])

    return (
        <div className="AlbumInfo">
            <div className="leftArrow">&#60;</div>
            <div className="middleSection">
                {/* <h1>{userdb[0].title}</h1> */}
                <EachAlbum />
            </div>
            <div className="rightArrow">&#62;</div>
        </div>
    );
}

export default AlbumInfo;