import React from 'react';
import samplePic from "../../assets/samplePic.jpeg";
import "./albuminfo.css";

function AlbumInfo() {
    return (
        <div className="AlbumInfo">
            <div className="leftArrow">&#60;</div>
            <div className="albumContent">
                <div className="albumInfo">
                    <img className="albumCover" src={samplePic}></img>
                    <h1 className="albumTitle">Ann Steel Album</h1>
                    <h2 className="albumArtist">Ann Steel</h2>
                </div>
                <div className="albumRating">
                    <label>Rating</label>
                    <div>&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                    <label>Emojis</label>
                    <div></div>
                    <label>Tags</label>
                    <input placeholder=''></input>
                </div>
            </div>
            <div className="rightArrow">&#62;</div>
        </div>
    );
}

export default AlbumInfo;