import React from 'react';

function LoginForm() {
    return <div>
        {/* e is the variable from the form that contains all info about the form */}
        <form className="SignupForm">
            <label htmlFor="loginEmail">Email</label>
            <input type="email" name="loginEmail" />

            <label htmlFor="loginPassword">Password</label>
            <input type="password" name="loginPassword" />
            
            <button>Submit</button>
        </form>
    </div>
}

export default LoginForm;