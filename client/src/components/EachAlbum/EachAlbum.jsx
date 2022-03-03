import React from 'react';
import samplePic from "../../assets/samplePic.jpeg";
import "./eachalbum.css";

function showMore() {
    let albumRating = document.getElementsByClassName("albumRating")[0];
    let albumTracks = document.getElementsByClassName("albumTracks")[0];
    if (albumRating.style.display === "block") {
        albumRating.style.display = "none";
        albumTracks.style.display = "block";
    } else {
        albumRating.style.display = "block";
        albumTracks.style.display = "none";
    }
}

function EachAlbum({album}) {
    return (
        <div className="albumContent">
            <div className="albumFront">
                <div className="albumInfo">
                    <img className="albumCover" src={samplePic} onClick={showMore}></img>
                    <h1 className="albumTitle">{album ? album.title : "loading album title"}</h1>
                    <h2 className="albumArtist">{album ? album.artistNames[0] : "loading artists"}</h2>
                </div>
                <div className="albumRating">
                    <label>Rating</label>
                    <div>&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                    <label>Emojis</label>
                    <div></div>
                    <label>Tags</label>
                    <input placeholder=''></input>
                </div>
                <div className="albumTracks">
                    <ol>
                        <li>Find Your Way</li>
                        <li>Quite Still</li>
                        <li>Sport et divertissement</li>
                        <li>Southafternoon</li>
                        <li>My Time</li>
                    </ol>
                </div>
            </div>
            {/* <div className="albumBack">

                <ol>
                    <li>Find Your Way</li>
                    <li>Quite Still</li>
                    <li>Sport et divertissement</li>
                    <li>Southafternoon</li>
                    <li>My Time</li>

                </ol>
            </div> */}
        </div>
    );
}

export default EachAlbum;
