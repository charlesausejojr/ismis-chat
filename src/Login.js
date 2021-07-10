import { Button } from '@material-ui/core';
import React from 'react'
import "./Login.css"
import { auth, provider } from "./firebase"

function Login() {
    const signIn = () =>{
        auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img 
                src="https://upload.wikimedia.org/wikipedia/en/3/39/University_of_San_Carlos_logo.png"
                alt="ismessage"
                ></img>
                <h1>ISMISsage</h1>
            </div>
            <Button onClick={signIn} type="submit">
                Sign In
            </Button>
        </div>
    )
}

export default Login
