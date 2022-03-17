import React, {useState, useEffect } from 'react';
// import Picker from 'emoji-picker-react';
import {FaStar} from 'react-icons/fa';
import samplePic from "../../assets/samplePic.jpeg";
import "./eachalbum.css";
import axios from "axios";

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
//     const [chosenEmoji, setChosenEmoji] = useState(null);

//     const onEmojiClick = (event, emojiObject) => {
//         setChosenEmoji(emojiObject);
//     };

    const [rating, setRating] = useState(null);
    // const [hover, setHover] = useState(null);

    // const [albumUserdata, setAlbumUserdata] = useState({});

    // useEffect(()=>{
    //     console.log(albumUserdata);
    //     axios.put("http://localhost:4000/albums/" + album._id , { marked:true, userData:albumUserdata });
    // }, [albumUserdata])

    const updateAlbum = (updatedData)=> {
        console.log(updatedData)
        axios.put("http://localhost:4000/albums/" + album._id , { marked:true, userData:updatedData });
    }

    return (
        <div className="albumContent">
            <div className="albumFront">
                <div className="albumInfo">
                    <img className="albumCover" src={samplePic} onClick={showMore}></img>
                    <h1 className="albumTitle">{album ? album.title : "loading album title"}</h1>
                    <h2 className="albumArtist">{album ? album.artistNames[0] : "loading artists"}</h2>
                </div>
                <div className="albumRating">
                    <div>
                        <label>Rating</label>
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i+1;
                            return (
                                <label key={i}>
                                    <input type="radio" 
                                        name="rating" 
                                        value={ratingValue} 
                                        onClick={()=>setRating(ratingValue)}
                                    />
                                    <FaStar className="star" 
                                        color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    {/* <div>&#9733;&#9733;&#9733;&#9733;&#9734;</div> */}
                    {/* <label>Emojis</label>
                    <div>
                        {chosenEmoji ? (
                            <span>You chose: {chosenEmoji.emoji}</span>
                        ) : (
                            <span>No emoji Chosen</span>
                        )}
                        <Picker onEmojiClick={onEmojiClick} />
                    </div> */}
                    <div>
                        <label>Tags</label>
                        <input placeholder=''></input>
                    </div>
                </div>

                <div className="albumTracks">
                    <ul>
                        {album && album.trackNames.map((track, i) => (
                            <li key={i} >
                                <div className="trackNoNamePlus"> 
                                    <span className="trackNo">{i+1}</span>
                                    <span className="trackName">{track}</span>
                                    <span className="plus" onClick={()=> {
                                        let thisEl = document.getElementsByClassName("albumTracks")[0];
                                        let tRating = thisEl.getElementsByClassName("trackRating")[i];
                                        if (tRating.style.display === "none") tRating.style.display = "block";
                                        else tRating.style.display = "none";
                                    }}>+</span>
                                </div>
                                <div className="trackRating">
                                    <div>
                                        <label>Rating</label>
                                        {[...Array(5)].map((star, s) => {
                                            const ratingValue = s+1;
                                            return (
                                                <label key={s}>
                                                    <input type="radio" 
                                                        name="rating" 
                                                        value={ratingValue} 
                                                        onClick={()=>setRating(ratingValue)}
                                                    />
                                                    <FaStar className="star" 
                                                        color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                                                    />
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {/* <div>&#9733;&#9733;&#9733;&#9733;&#9734;</div> */}
                                    {/* <label>Emojis</label>
                                    <div>
                                        {chosenEmoji ? (
                                            <span>You chose: {chosenEmoji.emoji}</span>
                                        ) : (
                                            <span>No emoji Chosen</span>
                                        )}
                                        <Picker onEmojiClick={onEmojiClick} />
                                    </div> */}
                                    <div>
                                        <label>Tags</label>
                                        <input placeholder=''></input>
                                    </div>
                                </div>
                            </li> 
                        ))}
                    </ul>
                </div>
                {/* <button onClick={() => setAlbumUserdata({
                    rating:rating
                })}>Log this album</button> */}
                <button onClick={() => updateAlbum({rating:rating})}>Log this album</button>
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
