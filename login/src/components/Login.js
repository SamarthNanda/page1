import React, { useState } from 'react'
import '../App.css';
import Axios from 'axios';
import { Link, useHistory, Redirect } from 'react-router-dom';
import LoggedIn from './LoggedIn';
import Cookies from 'js-cookie'
import Decode from 'jwt-decode'


export default function Login(props) {

    // login route------------------------------------------------------------------------------
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        console.log("login is called");
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }).then(function (response) {
            if (response.data.message) {
                console.log(response.data.message);
                if (response.data.message === "wrong password") {
                    alert("Try logging in with a Correct Password");
                } else {
                    alert("Try logging in with a valid Username or Register yourself Now");
                }
            }
            else {
                // Cookies.set("refreshToken", refreshToken);

                const { token } = response.data;
                const decoded = Decode(token);
                Cookies.set("email", decoded.email);
                Cookies.set("userType", decoded.userType);
                Cookies.set("token", token);
                console.log(decoded);
                setLoginStatus("/loggedin");

            }
        });

    }

    return (
        <div className="form">
            <br />
            <h1>Login Page</h1>
            <br />
            <form >
                <input type="text" id="login" className="form-control" name="username" placeholder="Username" required
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input type="password" id="password" className="form-control" name="password" placeholder="password" required
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <br />
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Login</button><span>   </span>


                <Link to="/register">
                    <button type="submit" className="btn btn-info">Register Now</button>
                </Link>

            </form>
            <br />
            {loginStatus === "/loggedin" ? <div><h3>Hi {Cookies.get("email")}</h3>
                <Link to={{ pathname: loginStatus, prop: { userType: Cookies.get("userType"), email: Cookies.get("email") } }}>
                    <button className="btn btn-info">continue As {Cookies.get("userType")}</button>
                </Link></div> : <span> </span>}

        </div >
    )
}

