import React, { useState, useEffect} from 'react';
import "./albuminfo.css";
import axios from "axios";
import {FaStar} from 'react-icons/fa';
import samplePic from "../../assets/samplePic.jpeg";
import {FaCaretRight, FaCaretLeft} from 'react-icons/fa';
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

function AlbumInfo() {
    const [userdb, setUserdb] = useState([]);
    const [albumCount, setAlbumCount] = useState(0);
    const [currentAlbum, setCurrentAlbum] = useState(null);

    const [albumRating, setAlbumRating] = useState(null);
    const [trackRatings, setTrackRatings] = useState([]);

    const [albumTags, setAlbumTags] = useState([]);
    const [trackTags, setTrackTags] = useState([]);

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
            console.log("trackTags: ", temp);
            setTrackTags(temp);
            event.target.value = "";
        }
    }

    const removeTrackTags = (indexToRemove, trackNo) => {
        setTrackTags(trackTags[trackNo].filter((_, index) => index !== indexToRemove));
    }

    const renderTrackTag = () => {
        console.log(trackTags[0])
        console.log(trackTags[0][0])
        return (
            <li className="tag">{trackTags[0][0]}</li>
        )
    }

    useEffect(() => {
        console.log(trackTags)
        if (trackTags[0]) console.log(trackTags[0][0]);
        if (document.getElementsByClassName("tags")[0]) {
            document.getElementsByClassName("tags")[0].innerHTML = trackTags[0][0];
        }
        else {
            console.log("no")
        }
    }, [trackTags])

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = await axios.get("http://localhost:4000/albums/userdb/6220fc41b82cfe6798c7da50") // add userId
            let unMarkedData = [];
            let i = 0;
            while (res.data[i]) {
                if (!res.data[i].marked) unMarkedData.push(res.data[i]);
                i++;
            }
            setUserdb(unMarkedData);
            // console.log("just set userdb to ", unMarkedData)
        }
        fetchUserdb();
    }, [])

    useEffect(()=>{ 
        if (userdb[albumCount]) {
            // console.log("gonna set currAlbum, ", albumCount)
            // console.log("currently: ", currentAlbum)
            setCurrentAlbum(userdb[albumCount]);
            // console.log("and now: ", currentAlbum);
            // console.log("just set currentAlbum to ", userdb[albumCount]);
            updateRatings(userdb[albumCount]);
        }
        else {
            // console.log("gonna set currAlb to null, ", albumCount )
            setCurrentAlbum(null);
            // console.log("just set currentAlbum to null")
        }
    }, [userdb, albumCount])

    function updateRatings(album) {
        // console.log("check1")
        // console.log("in here ", album)
        if (album) {
            // console.log("check2")
            let tempRatings = []
            let tempTags = []
            for (let i = 0; i < album.tracks.length; i++) {
                tempRatings.push(null);
                tempTags.push([])
            }
            setTrackRatings(tempRatings);
            setAlbumRating(null);

            // console.log("temp: ", tempTags)
            setTrackTags(tempTags);
            setAlbumTags([]);
        }
    }
/* NEVER FIRES
    useEffect(() => {
        console.log("check1")
        console.log("in here ", currentAlbum)
        if (currentAlbum) {
            console.log("check2")
            let tempRatings = []
            let tempTags = []
            for (let i = 0; i < currentAlbum.tracks.length; i++) {
                tempRatings.push(null);
                tempTags.push([])
            }
            setTrackRatings(tempRatings);
            setAlbumRating(null);

            console.log("temp: ", tempTags)
            setTrackTags(tempTags);
            setAlbumTags([]);
        }
        
    }, [currentAlbum])
*/

    const updateAlbum = (updatedData)=> {
        axios.put("http://localhost:4000/albums/" + currentAlbum._id , { 
            albumUserData:updatedData[0],
            tracksUserData:updatedData[1]
        });
    }

    //console.log("tT: ", trackTags)

    function renderEachAlbum(album) {
        return (
            <div className="albumContent">
                <div className="albumFront">

                    <div className="albumInfo">
                        <img className="albumCover" src={samplePic} onClick={showMore}></img>
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
                        {/*}
                        <div className="albumRatingSection albumTagsSection">
                            <label className="albumRatingLabel">Tags</label>
                            <input className='albumTags albumRatingInput textInput' placeholder=''></input>
                        </div>
                        */}
                        <div className="albumRatingSection albumTags2Section">
                            <label className="albumRatingLabel">Tags</label>
                            <div className="tags-input albumRatingInput">
                                <ul id="tags">
                                    {albumTags.map((albumTag, index) => {
                                        console.log(albumTags[index])
                                        return (
                                        <li key={index} className="tag">
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
                                <li className="entireTrack" key={i}>
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
                                                                color={starRatingValue_t <= trackRatings[i] ? '#ffea00' : 'none'}
                                                            />
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        {/*}
                                        <div className="trackRatingSection trackTagsSection">
                                            <label>Tags</label>
                                            <input className='tags' placeholder=''></input>
                                        </div>
                                        */}
                                        <div className="trackRatingSection trackTags2Section">
                                            <label className="trackRatingLabel">Tags</label>
                                            <div className="tags-input trackRatingInput">
                                                <ul className="tags">
                                                    {/*trackTags[0][0] === "a" ? renderTrackTag() : <li>no</li>*/}
                                                    {/*
                                                    <li className="tag">{trackTags ? trackTags[0][0] : "none"}</li>
                                                    {trackTags && trackTags[i].map((trackTag, jindex) => {
                                                        console.log(i, jindex, trackTag);
                                                        return (
                                                        <li key={jindex} className="tag">
                                                            <span className='tag-title'>{trackTag}</span>
                                                            <span className='tag-close-icon'
                                                                onClick={() => removeTrackTags(jindex, i)}>
                                                                    x
                                                            </span>
                                                        </li>
                                                    )})}
                                                        */}
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
                while (allTracks[j]) {
                    let jStars = trackRatings[j];
                    let jTags = trackTags[j];
                    // let jTags = allTracks[j].getElementsByClassName('trackTags')[0].value;
                    if ((jStars) || (jTags != []) ) {
                        taggedTracks[j] = {rating:jStars, tags:jTags}
                    }
                    j++;
                }
                updateAlbum([
                    {rating:albumRating, tags:albumTags},
                    taggedTracks
                ]);
                // reset values before incrementing album
                /*
                let k = 0;
                let trackTags = document.getElementsByClassName('trackTags');
                while (trackTags[k]) trackTags.value = "";
                document.getElementsByClassName('albumTags')[0].value = "";
                */
                document.getElementsByClassName('albumJournal')[0].value="";
                setAlbumCount(albumCount+1);
                }}>
                <FaCaretRight size={30} color="black"/>
            </div>
        </div>
    );
}

export default AlbumInfo;