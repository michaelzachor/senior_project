import React from 'react';
import "..//albumsindb.css";
import {FaStar} from 'react-icons/fa';

function Modal(props) {
    let album = props.album;
    console.log(album);
    if (album) {
        return (
            <div className="modal" style={{backgroundImage: `url("`+album.img+`")`}}>
                <div className="allModalContent">
                    <span className="close" onClick={() => {
                        let modal = document.getElementsByClassName("modal")[0];
                        document.getElementsByClassName("dbAlbumTags")[0].innerHTML = '';
                        document.getElementsByClassName("dbTrackTags")[0].innerHTML = '';
                        modal.style.display = "none";
                        console.log("noModalAlbum")
                        props.noModalAlbum();
                    }}>&times;</span>
                    <div className="modal-content">
                        <div className="dbAlbumInfo">
                            <img className="albumCoverModal" alt="album cover" src={album && album.img}></img>
                            <h1 className="albumTitleModal">{album && album.title}</h1>
                            <h2 className="albumArtistModal">{album && album.artistNames[0]}</h2>
                        </div>
                        <div className="dbAlbumRating">
                            <div className="dbAlbumRatingSection dbAlbumStarsSection">
                                {album && [...Array(5)].map((star, i) => {
                                    const rating = album.userData.rating;
                                    return (
                                        <FaStar key={i} color={i+1 <= rating ? '#ffea00' : 'black'} />
                                )})}
                            </div>
                            <div className="dbAlbumRatingSection dbAlbumTagsSection">
                                <ul className="dbAlbumTags tags">
                                    {album &&album.userData.tags.map((albumTag, index) => {
                                        return (
                                            <li key={index} className="tag">{albumTag}</li>
                                    )})}
                                </ul>
                            </div>
                            <div className="dbAlbumRatingSection dbAlbumJournalSection">
                                {album && album.userData.journal != "" && 
                                <div className="dbAlbumJournal">
                                    {album.userData.journal}
                                </div>}
                            </div>
                        </div>
                        <div className="dbAlbumTracks">
                            <ul className="dbAlbumTrackList">
                                {album && album.tracks.map((track, t) => {
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
                                                    return (
                                                        <FaStar key={s} color={s+1 <= rating_t ? '#ffea00' : 'black'} />
                                                )})} 
                                            </div>
                                            <div className="dbTrackTagsSection">
                                                <ul className="dbTrackTags tags">
                                                    {track.userData.tags.map((trackTag, index) => {
                                                        return (
                                                            <li key={index} className="tag">{trackTag}</li>
                                                    )})}
                                                </ul>
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