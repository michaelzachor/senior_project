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
    const [albumCount, setAlbumCount] = useState(0);
    const [currentAlbum, setCurrentAlbum] = useState(null);

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = await axios.get("http://localhost:4000/albums/userdb/6220fc41b82cfe6798c7da50") // add userId
            console.log("data",res.data)
            let unMarkedData = [];
            let i = 0;
            while (res.data[i]) {
                if (!res.data[i].marked) unMarkedData.push(res.data[i]);
                i++;
            }
            console.log("newdata",unMarkedData)
            setUserdb(unMarkedData);
        }
        fetchUserdb();
        // console.log("user db rendered")
        console.log("db",userdb);
    }, [])

    useEffect(()=>{ 
        setCurrentAlbum(userdb[albumCount]);
    }, [userdb, albumCount])

    console.log(currentAlbum);

    return (
        <div className="AlbumInfo">
            <div className="leftArrow">&#60;</div>
            <div className="middleSection">
                <EachAlbum album={currentAlbum}/>
            </div>
            {/* <div className="rightArrow" onClick={() => {
                do setAlbumCount(albumCount+1)
                while (currentAlbum.marked)}}>&#62;</div> */}
            <div className="rightArrow" onClick={() => setAlbumCount(albumCount+1)}>&#62;</div>
        </div>
    );
}

export default AlbumInfo;