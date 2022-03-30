// import React from 'react';
// import axios from 'axios';
import Header from "../components/Header/Header"
import LoginForm from "../components/LoginForm/LoginForm"
import "../components/LoginForm/loginform.css"

function Login() {
    return (
        <div className='Login'>
            <Header />
            <LoginForm />
        </div>
    )
}

export default Login;