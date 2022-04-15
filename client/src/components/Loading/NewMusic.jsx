import React, { useState, useEffect, useContext} from 'react';
import axios from "axios";
import {AuthContext} from '../../context/AuthContext';
import { requestAuthorization, onPageLoad } from '../../spotifyApiCalls';
import {useNavigate} from 'react-router-dom'
import "./loading.css";

function NewMusic() {
    const SERVER_URL = `https://seniorproject-michaelzachor.herokuapp.com/`
    // const SERVER_URL = 'http://localhost:4000/'
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        async function load() {
            onPageLoad(user._id);
        }
        if (user) {
            console.log(user._id);
            load().then(
                navigate('/home')
            );
        }
        // const fetchUserUnmarkedDB = async () => {
        //     onPageLoad();
        // }
        // fetchUserUnmarkedDB();
        // console.log(user);
    }, [user])

    return (
        <div className="NewMusic">
            <div className="loading">Loading...</div>
        </div>
    )
}

export default NewMusic;