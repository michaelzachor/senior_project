import React, { useState, useEffect, useContext} from 'react';
import axios from "axios";
import {FaStar, FaCaretRight, FaCaretLeft} from 'react-icons/fa';
import {AuthContext} from '../../context/AuthContext';
import { onPageLoad } from '../../spotifyApiCalls';
import samplePic from "../../assets/samplePic.jpeg";
import "./albuminfo.css";

// SHOW ALBUM TRACKS
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

function AlbumInfo(props) {
    const SERVER_URL = `https://seniorproject-michaelzachor.herokuapp.com/`
    const { user } = useContext(AuthContext);

    const [userdb, setUserdb] = useState([]);
    const [albumCount, setAlbumCount] = useState(0);
    const [currentAlbum, setCurrentAlbum] = useState(null);

    const [albumRating, setAlbumRating] = useState(null);
    const [trackRatings, setTrackRatings] = useState([]);

    const [albumTags, setAlbumTags] = useState([]);
    const [trackTags, setTrackTags] = useState([]);

    // HANDLE TAGS
    const addAlbumTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setAlbumTags([...albumTags, event.target.value]);
            event.target.value = "";
        }
    }
    const removeAlbumTags = indexToRemove => {
        setAlbumTags(albumTags.filter((_, index) => index !== indexToRemove));
    }
    const addTrackTags = (event, trackNo) => {
        if (event.key === "Enter" && event.target.value !== "") {
            let temp = trackTags;
            temp[trackNo].push(event.target.value)
            setTrackTags(temp);
            event.target.value = "";
        }
    }
    const removeTrackTags = (indexToRemove, trackNo) => {
        console.log("removing: ", trackTags[trackNo][indexToRemove])
        let temp = trackTags[trackNo].filter((_, index) => index !== indexToRemove);
        let tempAll = trackTags;
        tempAll[trackNo] = temp;
        console.log(tempAll);
        setTrackTags(tempAll);
    }


    useEffect(()=>{
        console.log("onpageload")
        console.log("user._id: ",user._id)
        // onPageLoad();
        onPageLoad(user._id)
    }, [])

    // onPageLoad can have parameter user._id
    // in onPageLoad, if it's the first time, ignore the param
    //      if it's the second time, set userId = param
    //      if param is null, do nothing (this takes care of calling onPageLoad within sAC.js)
    // and now we can add albums with userId=userId if they're not already in there. 


    // SET USER DB (this is not gonna run until the entire userdb is updated with new stuff from spotify)
    useEffect(()=>{
        const fetchUserUnmarkedDB = async () => {
            const res = await axios.get(SERVER_URL+`albums/${user._id}`);
            let unMarkedData = [];
            let i = 0;
            while (res.data[i]) {
                if (!res.data[i].marked) unMarkedData.push(res.data[i]);
                i++;
            }
            setUserdb(unMarkedData);
        }
        fetchUserUnmarkedDB();
    }, [])

    // SET CURRENT ALBUM
    useEffect(()=>{ 
        if (userdb[albumCount]) {
            setCurrentAlbum(userdb[albumCount]);
            updateRatings(userdb[albumCount]);
            props.changeBgImg(userdb[albumCount].img);
        }
        else setCurrentAlbum(null);
    }, [userdb, albumCount])

    console.log('USERDB: ', userdb);

    // RESET RATINGS ON NEW ALBUM
    function updateRatings(album) {
        if (album) {
            let tempRatings = []
            let tempTags = []
            for (let i = 0; i < album.tracks.length; i++) {
                tempRatings.push(null);
                tempTags.push([])
            }
            setTrackRatings(tempRatings);
            setAlbumRating(null);
            setTrackTags(tempTags);
            setAlbumTags([]);
        }
    }

    if (currentAlbum) console.log("cAId: ",currentAlbum._id);

    // PUSH NEW USER DATA TO ALBUM
    const updateAlbum = (updatedData)=> {
        console.log("in update album: ", currentAlbum._id)
        try {
            axios.put(SERVER_URL+`albums/${currentAlbum._id}`, { 
                albumUserData:updatedData[0],
                tracksUserData:updatedData[1]
            });
        } catch(err) {
            console.log("in catch")
            console.log(err);
        }
        console.log("still in update album")
        // console.log("userDataAlbum: ", updatedData[0]);
        // console.log("tried axios put 62465478ee07f5e0649204b5: ",updatedData[1])
    }

    // SHOW AN ALBUM
    function renderEachAlbum(album) {
        return (
            <div className="albumContent">
                <div className="albumFront">

                    <div className="albumInfo">
                        <img className="albumCover" alt="album cover" src={album ? album.img : samplePic} onClick={showMore}></img>
                        <h1 className="albumTitle">{album ? album.title : "loading album title"}</h1>
                        <h2 className="albumArtist">{album ? album.artistNames[0] : "loading artists"}</h2>
                    </div>

                    <div className="albumRating">
                        <div className="albumRatingSection albumStarsSection">
                            <label className="albumRatingLabel">Rating</label>
                            <div className="albumRatingInput">
                            {[...Array(5)].map((star, i) => {
                                const starRatingValue = i+1;
                                return (
                                    <label key={i}>
                                        <input 
                                            className="albumRating" 
                                            type="radio" 
                                            name="star" 
                                            value={starRatingValue} 
                                            onClick={()=>setAlbumRating(starRatingValue)}
                                        />
                                        <FaStar className="star" 
                                            color={starRatingValue <= albumRating ? '#ffea00' : 'rgba(177, 171, 153, 0.5)'}
                                        />
                                    </label>
                                );
                            })}
                            </div>
                        </div>
                        <div className="albumRatingSection albumTags2Section">
                            <label className="albumRatingLabel">Tags</label>
                            <div className="tags-input albumRatingInput">
                                <ul id="tags">
                                    {albumTags.map((albumTag, index) => {
                                        console.log(albumTags[index])
                                        return (
                                        <li key={albumTag} className="tag">
                                            <span className='tag-title'>{albumTag}</span>
                                            <span className='tag-close-icon'
                                                onClick={() => removeAlbumTags(index)}>
                                                    x
                                            </span>
                                        </li>
                                    )})}
                                </ul>
                                <input
                                    type="text"
                                    onKeyUp={event => event.key === "Enter" ? addAlbumTags(event) : null}
                                    placeholder="Press enter to add tags"
                                />
                            </div>
                        </div>
                        <div className="albumRatingSection albumJournalSection">
                            <label className="albumRatingLabel journalLabel">Journal</label>
                            <textarea className='albumJournal albumRatingInput textInput' placeholder=''></textarea>
                        </div>
                    </div>

                    <div className="albumTracks">
                        <ul className="albumTrackList">
                            {album && album.tracks.map((track, i) => (
                                <li className="entireTrack" key={track.title}>
                                    <div className="trackNoNamePlus"> 
                                        <span className="trackNo">{i+1}</span>
                                        <span className="trackName">{track.title}</span>
                                        <span className="plus" onClick={()=> {
                                            let thisEl = document.getElementsByClassName("albumTracks")[0];
                                            let tRating = thisEl.getElementsByClassName("trackRating")[i];
                                            if (tRating.style.display === "none") tRating.style.display = "block";
                                            else tRating.style.display = "none";
                                        }}>+</span>
                                    </div>

                                    <div className="trackRating">
                                        <div className="trackRatingSection trackStarsSection">
                                            <label className="trackRatingLabel">Rating</label>
                                            <div className="trackRatingInput">
                                                {[...Array(5)].map((star, s) => {
                                                    const starRatingValue_t = s+1;
                                                    let trackNo = i;
                                                    return (
                                                        <label key={s}>
                                                            <input 
                                                                className={"trackStars " + trackNo}
                                                                type="radio" 
                                                                name="star_t" 
                                                                value={starRatingValue_t} 
                                                                onClick = {() => {
                                                                    let temp = trackRatings.slice(0,trackNo);
                                                                    temp.push(starRatingValue_t);
                                                                    if (trackNo < trackRatings.length-1) temp = temp.concat(trackRatings.slice(trackNo+1,trackRatings.length));
                                                                    setTrackRatings(temp);
                                                                }}
                                                            />
                                                            <FaStar className="star" 
                                                                color={starRatingValue_t <= trackRatings[i] ? '#ffea00' : 'black'}
                                                            />
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="trackRatingSection trackTags2Section">
                                            <label className="trackRatingLabel">Tags</label>
                                            <div className="tags-input trackRatingInput">
                                                <ul className="tags">
                                                    {trackTags && trackTags[i].map((trackTag, jindex) => {
                                                        return (
                                                        <li key={trackTag} className="tag">
                                                            <span className='tag-title'>{trackTag}</span>
                                                            <span className='tag-close-icon'
                                                                onClick={() => removeTrackTags(jindex, i)}>
                                                                    x
                                                            </span>
                                                        </li>
                                                    )})}
                                                </ul>
                                                <input
                                                    type="text"
                                                    onKeyUp={event => event.key === "Enter" ? addTrackTags(event, i) : null}
                                                    placeholder="Press enter to add tags"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li> 
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="AlbumInfo">

            <div className="leftArrow" onClick={() => setAlbumCount(albumCount-1)}>
                <FaCaretLeft size={30} color="black"/>
            </div>

            <div className="middleSection">
                {renderEachAlbum(currentAlbum)}
            </div>

            <div className="rightArrow" onClick={() => {
                let taggedTracks = {};
                let allTracks = document.getElementsByClassName('trackRating');
                let j = 0;
                let anyTracksMarked = false;
                while (allTracks[j]) {
                    let jStars = trackRatings[j];
                    let jTags = trackTags[j];
                    console.log("jS: ",jStars);
                    console.log("jT: ",jTags);
                    if ((jStars) || (jTags.length > 0) ) {
                        console.log("jStars or jTags")
                        anyTracksMarked = true;
                        taggedTracks[j] = {rating:jStars, tags:jTags}
                    } 
                    j++;
                }
                console.log("tT: ", taggedTracks);
                console.log("aR: ", albumRating);
                console.log("aT: ", albumTags);
                if (albumRating || albumTags.length > 0 || anyTracksMarked) {
                    console.log("updating album")
                    updateAlbum([
                        {rating:albumRating, tags:albumTags},
                        taggedTracks
                    ]);
                }
                document.getElementsByClassName('albumJournal')[0].value="";
                setAlbumCount(albumCount+1);
                }}>
                <FaCaretRight size={30} color="black"/>
            </div>
        </div>
    );
}

export default AlbumInfo;