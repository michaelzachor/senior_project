import React, {useRef, useContext} from 'react';
import {FaAt, FaLock} from 'react-icons/fa';
import {loginCall} from "../../apiCalls"
import { AuthContext } from '../../context/AuthContext';
import "./loginform.css"

function LoginForm() {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value}, dispatch)
    }
    console.log(user);
    return (
    <div className="LoginForm">
        <div className="loginLogo">
            Qt
        </div>
        {/* e is the variable from the form that contains all info about the form */}
        <form className="loginForm" onSubmit={handleClick}>
            <div className="loginEmailSection loginSection">
                <label htmlFor="loginEmail"><FaAt color='#FFEAA0'/></label>
                <input type="email" name="loginEmail" ref={email} required placeholder="email@address.com"/>
            </div>
            <div className="loginPasswordSection loginSection">
                <label htmlFor="loginPassword"><FaLock color='#FFEAA0'/></label>
                <input type="password" name="loginPassword" ref={password} required placeholder="password"/>
            </div>

            <button>Login</button>
        </form>
    </div>    
)}

export default LoginForm;