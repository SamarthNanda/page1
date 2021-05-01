import React from 'react'
import { Link } from 'react-router-dom'

export default function LoggedIn(props) {
    console.log(props);
    return (
        <div>
            <br/>
            <h1>You are Logged In as {props.location.prop.userType}</h1>
<br/>
            {props.location.prop.userType === "admin" ? <textarea  >If You are Admin You Can Change This Text and is you are a student you are only allowed to read only!!</textarea>
                : <textarea readOnly="true" >If You are Admin You Can Change This Text and if you are a student you are allowed to read only!!</textarea>
            }
            <br />
<br/>

            <Link to="/">
                <button type="submit" className="btn btn-success">Logout</button>
            </Link>
        </div>
    )
}
