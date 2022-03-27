import React, { useEffect, useState } from 'react';
import "..//albumsindb.css";
import {FaStar} from 'react-icons/fa';

function Modal(albumInput) {
    let album = albumInput.album
    console.log(album);
    // console.log(album.img)
    if (album) {
        // console.log(album.album);
        return (
            <div className="modal" style={{backgroundImage: `url("`+album.img+`")`}}>
                <div className="allModalContent">
                    <span className="close" onClick={() => {
                        let modal = document.getElementsByClassName("modal")[0];
                        document.getElementsByClassName("tags")[0].innerHTML = '';
                        modal.style.display = "none";
                    }}>&times;</span>
                    {/* <img class="modal-content"></img> */}
                    <div className="modal-content">
                        <div className="dbAlbumInfo">
                            <img className="albumCoverModal" src={album && album.img}></img>
                            <h1 className="albumTitleModal">{album && album.title}</h1>
                            <h2 className="albumArtistModal">{album && album.artistNames[0]}</h2>
                        </div>
                        <div className="dbAlbumRating">
                            <div className="dbAlbumRatingSection dbAlbumStarsSection">
                                {album && [...Array(5)].map((star, i) => {
                                    const rating = album.userData.rating;
                                    // console.log("album: ", album.title, "i: ", i, "rating: ", rating);
                                    return (
                                        <FaStar key={i} color={i+1 <= rating ? '#ffea00' : '#e4e5e9'} />
                                )})}
                            </div>
                            <div className="dbAlbumRatingSection dbAlbumTagsSection">
                                <ul className="dbAlbumTags tags">
                                    {album &&album.userData.tags.map((albumTag, index) => {
                                        // console.log(albumTags[index])
                                        return (
                                            <li key={index} className="tag">{albumTag}</li>
                                    )})}
                                </ul>
                            </div>
                        </div>
                        <div className="dbAlbumTracks">
                            <ul className="dbAlbumTrackList">
                                {album && album.tracks.map((track, t) => {
                                    // console.log(track);
                                    return (
                                    <li className="dbTrack" key={t}>
                                        <div className="dbTrackNoNameInfo"> 
                                            <div className="dbTrackNoName">
                                                <span className="trackNoDB">{t+1}</span>
                                                <span className="trackNameDB">{track.title}</span>
                                            </div>
                                            <div className="dbTrackStarsSection">
                                                {track.userData.rating && [...Array(5)].map((star, s) => {
                                                    const rating_t = track.userData.rating;
                                                    // console.log("track: ", track, "tR ", rating_t);
                                                    return (
                                                        <FaStar key={s} color={s+1 <= rating_t ? '#ffea00' : '#e4e5e9'} />
                                                )})} 
                                            </div>
                                            <div className="dbTrackTagsSection"> 
                                            {/* <span className="trackTagsDB"> */}
                                                <ul className="tags">
                                                    {track.userData.tags.map((trackTag, index) => {
                                                        // console.log(albumTags[index])
                                                        return (
                                                            <li key={index} className="tag">{trackTag}</li>
                                                    )})}
                                                </ul>
                                                {/* {track.marked ? track.userData.tags : "-"}</span> */}
                                            </div>
                                        </div>
                                    </li>
                                )})}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    } return null;
    
}

export default Modal;