import React, { useState, useEffect} from 'react';
import "./albumsindb.css";
import axios from "axios";
import samplePic from "../../assets/samplePic.jpeg";
import {FaStar} from 'react-icons/fa';
import Modal from './Modal/Modal'

function AlbumsInDB() {
    const [userdb, setUserdb] = useState([]);
    const [modalAlbum, setModalAlbum] = useState(null);

    // function renderTagList(album) {
    //     for (let i = 0; i < album.tags.length; i++) {
    //         let newTag = document.createElement("li");
    //         newTag.className = "tag";
    //     }
    // }

    // function renderTrackList(album) {
    //     for (let i = 0; i < album.tracks.length; i++) 
    //     return (
    //         <li key={t}>
    //             <div className="trackNoNameInfo"> 
    //                 <span className="trackNoDB">{t+1}</span>
    //                 <span className="trackNameDB">{track.title}</span>
    //                 <span className="trackRatingDB">
    //                     {track.userData.rating && [...Array(5)].map((star, s) => {
    //                         const rating_t = track.userData.rating;
    //                         return (
    //                             <FaStar key={s} color={s+1 <= rating_t ? '#ffea00' : '#e4e5e9'} />
    //                     )})} 
    //                 </span> 
    //                 <span className="trackTagsDB">{track.marked ? track.userData.tags : "-"}</span>
    //             </div>
    //         </li>
    //     )
    // }

    function showAlbum(album, i) {
        let modal = document.getElementsByClassName("modal")[0];
        // console.log("modal: ", modal);
        // let modalAlbum = modal.getElementsByClassName("modal-content")[0];
        // let modalCover = modalAlbum.getElementsByClassName("albumCoverModal")[0];
        // let modalTitle = modalAlbum.getElementsByClassName("albumTitleModal")[0];
        // let modalArtist = modalAlbum.getElementsByClassName("albumArtistModal")[0];
        // let origImg = document.getElementsByClassName("dbAlbumCover")[i];
        // let tags = document.getElementsByClassName("dbAlbumTags")[0];
        // let stars = document.getElementsByClassName("dbAlbumStar");
        // let trackList = document.getElementsByClassName("dbAlbumTrackList")[0];
        // for (let i = 0; i < 5; i++) {
        //     if (i <= album.userData.rating) stars[i].color = '#ffea00';
        //     // i <= album.userData.rating ? stars[i].color='#ffea00' : stars[i].color='#e4e5e9';
        //     console.log(stars[i]);
        // }
        // for (let i = 0; i < album.userData.tags.length; i++) {
        //     let newTag = document.createElement("li");
        //     newTag.className = "tag";
        //     newTag.innerHTML = album.userData.tags[i];
        //     tags.appendChild(newTag);
        // }
        // for (let i = 0; i < album.tracks.length; i++) {
        //     let newTrack = document.createElement("li");
        //     let trackNoName = document.createElement("div");
        //     let trackNo = document.createElement("span");
        //     let trackName = document.createElement("span");
        //     let trackRating = document.createElement("div");
        //     let trackStars = document.createElement("div");
        //     let trackTags = document.createElement("ul");
        //     newTrack.className = "dbTrack";
        //     trackNoName.className = "dbTrackNoName";
        //     trackNo.className = "dbTrackNo";
        //     trackName.className = "dbTrackName";
        //     trackNo.innerHTML = i+1;
        //     trackName.innerHTML = album.tracks[i].title;
        //     trackNoName.appendChild(trackNo);
        //     trackNoName.appendChild(trackName);
        //     for (let i = 0; i < 5; i++) {
        //         if (i <= album.tracks[i].userData.rating) stars[i].color = '#ffea00';
        //         console.log(stars[i]);
        //         // issue is we don't have the stars items. so either make them here or drop this whole shindig you're doing
        //     }
        //     for (let i = 0; i < album.tracks[i].userData.tags.length; i++) {
        //         let newTag = document.createElement("li");
        //         newTag.className = "tag";
        //         newTag.innerHTML = album.userData.tags[i];
        //         tags.appendChild(newTag);
        //     }
        //     trackRating.appendChild(trackStars);
        //     trackRating.appendChild(trackTags);
        //     newTrack.appendChild() 
        // }
        modal.style.display = "block";
        // modalCover.src = origImg.src;
        // modalTitle.innerHTML = album.title;
        // modalArtist.innerHTML = album.artistNames[0];
    }

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = await axios.get("https://seniorproject-michaelzachor.herokuapp.com/albums/userdb/6220fc41b82cfe6798c7da50") // add userId
            // console.log("data",res.data)
            let markedData = [];
            let i = 0;
            while (res.data[i]) {
                if (res.data[i].marked) markedData.push(res.data[i]);
                i++;
            }
            // console.log("newdata",markedData)
            setUserdb(markedData);
        }
        fetchUserdb();
        // console.log("db",userdb);
    }, [])

    // console.log("final", userdb)
    return (
    <div className='AlbumsInDB'>
        <h2 className='dbSectionTitle'>Recently Logged</h2>
        <div className="dbAlbums">
            {userdb && userdb.map((album, i) => (
                <div key={i} className="dbAlbum">
                    <img className="dbAlbumCover" src={album.img} onClick={() => {
                        setModalAlbum(album);
                        showAlbum(album, i)}}>
                    </img>
                </div>
            ))}
        </div>
        <Modal album={modalAlbum} />

            {/* <div className='albumsInDB'>
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
                                            <FaStar key={i} color={i+1 <= rating ? '#ffea00' : '#e4e5e9'} />
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
                                                        // console.log("track: ", track, "tR ", rating_t);
                                                        return (
                                                            <FaStar key={s} color={s+1 <= rating_t ? '#ffea00' : '#e4e5e9'} />
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
            </div> */}
    </div>
    )
}

export default AlbumsInDB