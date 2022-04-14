import React, { useState, useEffect, useContext} from 'react';
import axios from "axios";
import {AuthContext} from '../../context/AuthContext';
import { requestAuthorization, onPageLoad } from '../../spotifyApiCalls';
import {useNavigate} from 'react-router-dom'
import "./loading.css";

function CountMusic() {
    const SERVER_URL = 'http://localhost:4000/'
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUserUnmarkedDB = async () => {
            // this is just to check the size of userdb so we can either auth Spotify or go straight to '/'
            const res = await axios.get(SERVER_URL+`albums/userdb/${user._id}`);
            let unMarkedData = [];
            let i = 0;
            while (res.data[i]) {
                if (!res.data[i].marked) unMarkedData.push(res.data[i]);
                i++;
            }
            if (unMarkedData.length > 50 || localStorage.getItem("access_token")) navigate('/home');
            else requestAuthorization();
        }
        fetchUserUnmarkedDB();
        console.log(user);
    }, [user])

    return (
        <div className="CountMusic">
            <div className="loading">Loading...</div>
        </div>
    )
}

export default CountMusic;