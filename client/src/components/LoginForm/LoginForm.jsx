import React from 'react';
import {FaAt, FaLock} from 'react-icons/fa';
import "./loginform.css"

function LoginForm() {
    return (
    <div className="LoginForm">
        <div className="loginLogo">
            Qt
        </div>
        {/* e is the variable from the form that contains all info about the form */}
        <form className="loginForm">
            <div className="loginEmailSection loginSection">
                <label htmlFor="loginEmail"><FaAt color='#FFEAA0'/></label>
                <input type="email" name="loginEmail" placeholder="email@address.com"/>
            </div>
            <div className="loginPasswordSection loginSection">
                <label htmlFor="loginPassword"><FaLock color='#FFEAA0'/></label>
                <input type="password" name="loginPassword" placeholder="password"/>
            </div>

            <button>Login</button>
        </form>
    </div>    
)}

export default LoginForm;