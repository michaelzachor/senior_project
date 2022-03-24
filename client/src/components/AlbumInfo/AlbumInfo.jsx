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

    const [tags, setTags] = useState([]);

    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    }

    const removeTags = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove))
    }

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
        }
        fetchUserdb();
    }, [])

    useEffect(()=>{ 
        if (userdb[albumCount]) setCurrentAlbum(userdb[albumCount]);
        else setCurrentAlbum(null)
    }, [userdb, albumCount])

    console.log(currentAlbum)

    useEffect(() => {
        if (currentAlbum) {
            let temp = []
            for (let i = 0; i < currentAlbum.tracks.length; i++) {
                temp.push(null);
            }
            setTrackRatings(temp);
            setAlbumRating(null);
        }
        
    }, [currentAlbum])


    const updateAlbum = (updatedData)=> {
        axios.put("http://localhost:4000/albums/" + currentAlbum._id , { 
            albumUserData:updatedData[0],
            tracksUserData:updatedData[1]
        });
    }

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
                                            color={starRatingValue <= albumRating ? '#ffc107' : '#e4e5e9'}
                                        />
                                    </label>
                                );
                            })}
                            </div>
                        </div>
                        <div className="albumRatingSection albumTagsSection">
                            <label className="albumRatingLabel">Tags</label>
                            <input className='albumTags albumRatingInput textInput' placeholder=''></input>
                        </div>

                        <div className="albumRatingSection albumTags2Section">
                            <label className="albumRatingLabel">Tags2</label>
                            <div className="tags-input">
                                <ul id="tags">
                                    {tags.map((tag, index) => (
                                        <li key={index} className="tag">
                                            <span className='tag-title'>{tag}</span>
                                            <span className='tag-close-icon'
                                                onClick={() => removeTags(index)}>
                                                    x
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <input
                                    type="text"
                                    onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
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
                        <ul>
                            {album && album.tracks.map((track, i) => (
                                <li key={i}>
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
                                            <label>Rating</label>
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
                                                            color={starRatingValue_t <= trackRatings[i] ? '#ffc107' : '#e4e5e9'}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <div className="trackRatingSection trackTagsSection">
                                            <label>Tags</label>
                                            <input className='trackTags' placeholder=''></input>
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
                    let jTags = allTracks[j].getElementsByClassName('trackTags')[0].value;
                    if ((jStars) || (jTags != '') ) {
                        taggedTracks[j] = {rating:jStars, tags:jTags}
                    }
                    j++;
                }
                updateAlbum([
                    {rating:albumRating, tags:document.getElementsByClassName('albumTags')[0].value},
                    taggedTracks
                ]);
                let k = 0;
                let trackTags = document.getElementsByClassName('trackTags');
                while (trackTags[k]) trackTags.value = "";
                document.getElementsByClassName('albumTags')[0].value = "";
                document.getElementsByClassName('albumJournal')[0].value="";
                setAlbumCount(albumCount+1);
                }}>
                <FaCaretRight size={30} color="black"/>
            </div>
        </div>
    );
}

export default AlbumInfo;