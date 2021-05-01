import React, { useState } from 'react'
import '../App.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';


export default function Register(props) {


    // register route----------------------------------------------------------------------------
    const [userTypeReg, setUserTypeReg] = useState("");
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [registered, setRegistered] = useState("");


    function register(e) {
        e.preventDefault();

        Axios.post('http://localhost:3001/register', {
            userType: userTypeReg,
            username: usernameReg,
            password: passwordReg
        }).then(function (response) {
            console.log(response.data.message);
            setRegistered(response.data.message);
        });
    }

    return (
        <div className="form">
            <br />
            <h1>Registration Page</h1>
            <br />
            <form onSubmit={register}>
                <select type="text" id="userType" className="form-control" name="userType" placeholder="User Type (Admin || Student)" required
                    onChange={(e) => {
                        setUserTypeReg(e.target.value);
                    }}
                ><option selected>Choose User Type...</option><option value="Admin">Admin</option>
                    <option value="Student">Student</option></select>
                <input type="text" id="login" className="form-control" name="username" placeholder="Username" required
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />
                <input type="password" id="password" className="form-control" name="password" placeholder="password" required
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />
<br />
                <button type="submit" className="btn btn-success">Register</button>
                

            </form>
            <br />
            {registered === "saved" ? <div><Link to="/"><button className="btn btn-info">Login to Continue</button></Link></div> : <span> </span>}
            {registered === "error" ? <div><p className="errorText">You are Already Registered!</p><Link to="/"><button className="btn btn-info">Click Here To Login</button></Link></div> : <span> </span>}
        </div>
    )
}

