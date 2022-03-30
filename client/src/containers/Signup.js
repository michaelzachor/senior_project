// import React from 'react';
// import axios from 'axios';
import Header from "../components/Header/Header"
import SignupForm from "../components/SignupForm/SignupForm"
import "../components/SignupForm/signupform.css"

function Signup() {
    return (
        <div className='Register'>
            <Header />
            <SignupForm />
        </div>
    )
}

export default Signup;