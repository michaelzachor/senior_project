import axios from 'axios';
import React, {useRef, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import {FaAt, FaLock} from 'react-icons/fa';
import "./signupform.css"

function SignupForm() {
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(password.current.value)
        console.log(passwordAgain.current.value)
        let supa = document.getElementById("suPA");
        if(passwordAgain.current.value !== password.current.value) {
            console.log("check")
            supa.setCustomValidity("Passwords don't match")
        } else {
            supa.setCustomValidity('');
            const user = {
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post(`http://localhost:4000/auth/register`, user)
                navigate('/login')
            } catch(err) {
                console.log(err);
            }
        }
        // signupCall({email:email.current.value,password:password.current.value}, dispatch)
    }
    // console.log(user);
    return (
    <div className="SignupForm">
        <div className="signupLogo">
            Qt
        </div>
        {/* e is the variable from the form that contains all info about the form */}
        <form className="signupForm" onSubmit={handleClick}>
            <div className="signupEmailSection signupSection">
                <label htmlFor="signupEmail"><FaAt color='#FFEAA0'/></label>
                <input type="email" name="signupEmail" ref={email} required placeholder="email@address.com"/>
            </div>
            <div className="signupPasswordSection signupSection">
                <label htmlFor="signupPassword"><FaLock color='#FFEAA0'/></label>
                <input type="password" name="signupPassword" ref={password} required minLength='6' placeholder="password"/>
            </div>
            <div className="signupPasswordAgainSection signupSection">
                <label htmlFor="signupPasswordAgain"><FaLock color='#FFEAA0'/></label>
                <input id="suPA" type="password" name="signupPasswordAgain" ref={passwordAgain} required minLength='6' placeholder="retype password"/>
            </div>

            <button type="submit">Signup</button>
        </form>
    </div>    
)}

export default SignupForm;