import axios from "axios";
import {requestAuthorization} from './spotifyApiCalls'

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START"});
    try {
        const res = await axios.post(`http://localhost:4000/auth/login`, userCredentials);
        requestAuthorization();
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err});
    }
}