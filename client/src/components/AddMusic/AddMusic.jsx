import React, { useState, useEffect, useContext} from 'react';
import axios from "axios";
import {AuthContext} from '../../context/AuthContext';
import { requestAuthorization, onPageLoad } from '../../spotifyApiCalls';
import {useNavigate} from 'react-router-dom'
import "./addmusic.css";

function AddMusic() {
    const SERVER_URL = 'http://localhost:4000/'
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUserUnmarkedDB = async () => {
            const res = await axios.get(SERVER_URL+`albums/userdb/${user._id}`);
            let unMarkedData = [];
            let i = 0;
            while (res.data[i]) {
                if (!res.data[i].marked) unMarkedData.push(res.data[i]);
                i++;
            }
            if (unMarkedData.length > 50) navigate('/');
            else {
                requestAuthorization();
                onPageLoad();
                navigate('/');
            }
        }
        fetchUserUnmarkedDB();
        console.log(user);
    }, [user])

    return (
        <h1>Check</h1>
    )
}

export default AddMusic;