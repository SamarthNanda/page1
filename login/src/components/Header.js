import React, { useState } from 'react';
import Register from './Register';
import Login from './Login'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import LoggedIn from './LoggedIn';


export default function Header(props) {

    return (
        <div>
            <header className="App-header">
                <Router>
                    <Switch>
                        <Route path="/register" component={Register} />
                        <Route path="/" exact component={Login} />
                        <Route path="/loggedin" exact component={LoggedIn} />
                    </Switch>
                </Router>
            </header>
        </div>
    )
}
