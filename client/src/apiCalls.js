import axios from "axios";
import {requestAuthorization} from './spotifyApiCalls'
// import {useNavigate} from 'react-router-dom'


export const loginCall = async (userCredentials, dispatch) => {
    const SERVER_URL = `https://seniorproject-michaelzachor.herokuapp.com/`
    // const SERVER_URL = `http://localhost:4000/`

    // const navigate = useNavigate();
    dispatch({ type: "LOGIN_START"});
    try {
        const res = await axios.post(SERVER_URL+`auth/login`, userCredentials);
        // navigate('/loading');
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err});
    }
}
