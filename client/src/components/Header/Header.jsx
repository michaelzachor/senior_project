import React from 'react';
import "./header.css";
import {FaUser} from 'react-icons/fa';


function Header() { 
    return (
        <header className="Header">
            <div className="headerLeft">
                <a href="./" className="logo">
                    Q
                </a>
            </div>
            {/* <div className="headerCenter">
                <div className="search">Search</div>
            </div> */}
            <div className="headerRight">
                <a href="./myMusic" className="db">
                    <FaUser />
                </a>
            </div>
            {/* <div className="navbar">
                <nav className="navAccount">
                    { loggedIn ? (
                        <>
                            <a className="account" href="/">My Account</a>
                            <a className="logout" onClick={() => LogoutFunction()}>Logout</a>
                        </>
                    ) : (
                        <>
                            <a className="login" href="/login">Log In</a>
                            <a className="signup" href="/create-account">Sign Up</a>
                        </>
                    )}
                </nav>
                <nav className="navPages">
                    <a className="trails" href="/trails">Trails</a>
                    <a className="apres" href="/apres_ski">Apres Ski</a>
                </nav>
            </div> */}
            
        </header>
    );
}

export default Header;