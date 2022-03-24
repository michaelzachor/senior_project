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

    const [albumRating, setAlbumRating] = useState(null);
    const [trackRatings, setTrackRatings] = useState([]);
    // const [hover, setHover] = useState(null);

    // const [albumUserdata, setAlbumUserdata] = useState({});

    // useEffect(()=>{
    //     console.log(albumUserdata);
    //     axios.put("http://localhost:4000/albums/" + album._id , { marked:true, userData:albumUserdata });
    // }, [albumUserdata])

    const updateAlbum = (updatedData)=> {
        console.log(updatedData);

        /*
        axios.put("http://localhost:4000/albums/" + album._id , { 
            marked:true, 
            userData:updatedData
        });
        */


        axios.put("http://localhost:4000/albums/" + album._id , { 
            albumUserData:updatedData[0],
            tracksUserData:updatedData[1]
        });
        
        /*
        axios.put("http://localhost:4000/albums/" + album._id, async (req, res) => { 
            try {
                const album = await Album.findById(req.params.id);
                await album.updateOne({$set:req.body});
                res.status(200).json("the album has been updated")
            } catch(err) {
                res.status(500).json(err)
            } 
            albumUserData:updatedData[0],
            tracksUserData:updatedData[1]

            marked:true, 
            userData:updatedData[0],
            tracks:
        });

        router.put("/:id", async (req, res) => {
            try {
                const album = await Album.findById(req.params.id);
                await album.updateOne({$set:req.body});
                res.status(200).json("the album has been updated")
            } catch(err) {
                res.status(500).json(err)
            }  
        })
        */
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
                    <div className="albumRatingSection">
                        <label className="albumRatingLabel">Rating</label>
                        <div className="albumRatingInput">
                        {[...Array(5)].map((star, i) => {
                            const albumRatingValue = i+1;
                            return (
                                <label key={i}>
                                    <input 
                                        className="albumRating" 
                                        type="radio" 
                                        name="albumRating" 
                                        value={albumRatingValue} 
                                        onClick={()=>setAlbumRating(albumRatingValue)}
                                    />
                                    <FaStar className="star" 
                                        color={albumRatingValue <= albumRating ? '#ffc107' : '#e4e5e9'}
                                    />
                                </label>
                            );
                        })}
                        </div>
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
                    <div className="albumRatingSection">
                        <label className="albumRatingLabel">Tags</label>
                        <input className='albumTags albumRatingInput' placeholder=''></input>
                    </div>
                    <div className="albumRatingSection albumJournalSection">
                        <label className="albumRatingLabel journalLabel">Journal</label>
                        <textarea className='albumJournal albumRatingInput' placeholder=''></textarea>
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
                                <div className={"trackRating " + i}>
                                    <div>
                                        <label>Rating</label>
                                        {[...Array(5)].map((star, s) => {
                                            const trackRatingValue = s+1;
                                            return (
                                                <label key={s}>
                                                    <input 
                                                        className={"trackStars " + i}
                                                        type="radio" 
                                                        name="trackRating" 
                                                        value={trackRatingValue} 
                                                        onClick = {() => {
                                                            setTrackRatings([...trackRatings, trackRatingValue])
                                                        }}
                                                    />
                                                    <FaStar className="star" 
                                                        color={trackRatingValue <= trackRatings[i] ? '#ffc107' : '#e4e5e9'}
                                                    />
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <div>
                                        <label>Tags</label>
                                        <input className='trackTags' placeholder=''></input>
                                    </div>
                                </div>
                            </li> 
                        ))}
                    </ul>
                </div>
                {/* <button onClick={() => setAlbumUserdata({
                    rating:rating
                })}>Log this album</button> */}
                {/*
                <button onClick={() => {
                    //let taggedTracks = [];
                    let taggedTracks = {};
                    let allTracks = document.getElementsByClassName('trackRating');
                    let j = 0;
                    while (allTracks[j]) {
                        let jStars = allTracks[j].getElementsByClassName('trackStars').value;
                        let jTags = allTracks[j].getElementsByClassName('trackTags').value;
                        if (jStars || jTags) {
                            //taggedTracks.push({j:[jStars, jTags]}); //tags, stars. taggedTracks is gonna be an array of objects that have index numbers as key and stars, tags as values.})
                            taggedTracks[j] = {rating:jStars, tags:jTags}
                        }
                        j++;
                    }
                    updateAlbum([
                        {rating:albumRating, tags:document.getElementsByClassName('albumTags').value},
                        taggedTracks
                    ])}}>
                    Log this album
                </button>
                */}
            </div>
        </div>
    );
}

export default EachAlbum;
