import axios from 'axios';

// const CLIENT_URL = `https://warm-jelly-6d1ccf.netlify.app/`
// const SERVER_URL = `https://seniorproject-michaelzachor.herokuapp.com/`
const CLIENT_URL = `http://localhost:3000/`
const SERVER_URL = `http://localhost:4000/`

let redirect_uri = CLIENT_URL;

let client_id = ""; 
let client_secret = "";

let access_token = null;
let refresh_token = null;
let currentPlaylist = "";
let userId = "";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const ALBUMS = "https://api.spotify.com/v1/me/albums";


// AUTHORIZATION
export function requestAuthorization(){
    client_id = process.env.REACT_APP_CLIENT_ID;
    client_secret = process.env.REACT_APP_CLIENT_SECRET;
    console.log(client_id);
    console.log(client_secret);
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-follow-read user-library-modify user-library-read playlist-modify-private playlist-read-collaborative playlist-read-private user-top-read playlist-modify-public user-read-recently-played";
    window.location.href = url; // Show Spotify's authorization screen
}

export function onPageLoad(paramId) {
//export function onPageLoad(paramId)
    // have we been redirected with a code, or is this the first time we're at this page
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if (paramId) userId = paramId;
    if ( window.location.search.length > 0 ){
        console.log("handling redirect")
        handleRedirect();
    }
    else{
        access_token = localStorage.getItem("access_token");
        console.log("getting albums: ", access_token);
        getAlbums(access_token);
        console.log("getting playlist albums")
        // getPlaylists(access_token);
    }
}

function handleRedirect() {
    // get the code, request access and refresh tokens from Spotify
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode(){
    // parse the query string and find the code
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
        console.log("gotCode",code)
    }
    return code;
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    // post request to spotify to get access and refresh tokens
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    // check if we got everything
    console.log("handleAuth");
    if ( this.status === 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        if ( data.access_token !== undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token !== undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        // onPageLoad();
        onPageLoad(null);
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

// GET MUSIC
function callApi(method, url, body, callback, accessToken){
    console.log("callapi accesstoken: ", accessToken);
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.send(body);
    xhr.onload = callback;
}

function getAlbums(accessToken) {
    callApi( "GET", ALBUMS, null, handleAlbumsResponse, accessToken );
}

function getPlaylists(accessToken) {
    callApi( "GET", PLAYLISTS, null, handlePlaylistsResponse, accessToken );
}

function getPlaylistTracks(accessToken, playlistID) {
    let url = TRACKS.replace("{{PlaylistId}}", playlistID);
    callApi( "GET", url, null, handlePlaylistTracksResponse, accessToken );
}

async function handleAlbumsResponse() {
    console.log("albums status: ", this.status);
    if ( this.status == 200 ){
        let data = JSON.parse(this.responseText);
        console.log(data);
        data.items.forEach(item => {
            addAlbumToDatabase(item.album)
        })
    }
    else if ( this.status == 401 ){
        // console.log("should refresh token")
        refreshAccessToken();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

async function addAlbumToDatabase(album) {
    let artistNames = [];
    let artistSpotifyIds = [];
    album.artists.forEach(artist => {
        artistNames.push(artist.name);
        artistSpotifyIds.push(artist.id);
    })
    let tracks = [];
    album.tracks.items.forEach(track => {
        let trackArtistNames = [];
        let trackArtistSpotifyIds = [];
        track.artists.forEach(trackArtist => {
            trackArtistNames.push(trackArtist.name);
            trackArtistSpotifyIds.push(trackArtist.id);
        })
        tracks.push({
            userId:userId,
            spotifyId:track.id,
            title:track.name,
            artistNames:trackArtistNames,
            artistSpotifyIds:trackArtistSpotifyIds,
            albumSpotifyId:album.id
        })
    });
    try {
        await axios.post(SERVER_URL+`albums/`, {
            userId:userId,
            spotifyId:album.id,
            artistNames:artistNames,
            artistSpotifyIds:artistSpotifyIds,
            title:album.name,
            tracks:tracks,
            img:album.images[0].url,
            year:parseInt(album.release_date.slice(0,4)),
            type:album.type
        })
    } catch(err) {
        console.log(err);
    }
}


async function handlePlaylistsResponse() {
    console.log("playlists status: ", this.status);
    if ( this.status == 200 ){
        console.log("playlists status was 200")
        let data = JSON.parse(this.responseText);
        console.log(data);
        data.items.forEach(item => {
            console.log(item);
            getPlaylistTracks("ok", item.id);
            // item.tracks.items.forEach(track => {
            //     addAlbumToDatabase(track.album)
            // })
        })
    }
    else if ( this.status == 401 ){
        console.log("need to refresh access token playlists")
        refreshAccessToken();
    }
    else {
        console.log("other playlsits error")
        console.log(this.responseText);
        alert(this.responseText);
    }
}

async function handlePlaylistTracksResponse() {
    if ( this.status == 200 ){
        let data = JSON.parse(this.responseText);
        console.log(data);
    }
    else if ( this.status == 401 ){
        refreshAccessToken();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

// function handleAlbumsResponse(){
//     if ( this.status == 200 ){
//         let data = JSON.parse(this.responseText);
//         console.log(data);
//         // here's where we're gonna add push new albums with the userId from onpageload params
//     }
//     else if ( this.status == 401 ){
//         refreshAccessToken()
//     }
//     else {
//         console.log(this.responseText);
//         alert(this.responseText);
//     }
// } 