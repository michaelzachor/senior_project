import React from 'react';
import EachAlbum from "../EachAlbum/EachAlbum"
import "./albuminfo.css";
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
    return (
        <div className="AlbumInfo">
            <div className="leftArrow">&#60;</div>
            <div className="middleSection">
                <EachAlbum />
            </div>
            <div className="rightArrow">&#62;</div>
        </div>
    );
}

export default AlbumInfo;