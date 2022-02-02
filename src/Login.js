import React from 'react';
import "./Login.css"
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { UseStateValue } from "./StateProvider"
import { actionTypes } from './reducer';
function Login() {
    const [{}, dispatch] = UseStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch(err => alert(err.message));
    }
    return <div className='Login'>
        <div className='Login_container'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png"
                alt="" />
            <div className='login_text'>
                <h1>Sign In to Whatsapp</h1>

            </div>
            <Button size="large" onClick={signIn}>
                SignIn with google
            </Button>
        </div>
    </div>;
}

export default Login;

