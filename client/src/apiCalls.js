import axios from "axios";
import {requestAuthorization} from './spotifyApiCalls'

export const loginCall = async (userCredentials, dispatch) => {
    const SERVER_URL = `https://seniorproject-michaelzachor.herokuapp.com/`
    dispatch({ type: "LOGIN_START"});
    try {
        const res = await axios.post(SERVER_URL+`auth/login`, userCredentials);
        requestAuthorization();
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err});
    }
}