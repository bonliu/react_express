import React from 'react';
import { Redirect } from 'react-router-dom';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

// import 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from './logo.svg';
// import './Login.css';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        responseToPost: '',
        authenticate: false
    };

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        });
        
        const body = await response.json();
        // console.log(body.message === 'success')
        // console.log(body.message)
        if (body.message === 'success') {
            this.setState({ authenticate: true });
        } else {
            alert("Account doesn't exist.")
        }
    }

    render() {
        // const { response } = this.state;
        if (this.state.authenticate) {
            return (<Redirect to="/profile"></Redirect>);
        }

        return (
            <div className="Login">
                {/* BootstrapCDN */}
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
                    rel="stylesheet"
                    id="bootstrap-css">
                </link>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                <h1 class="text-center text-white pt-5">Login form</h1>
                <div class="container">
                    <div id="login-row" class="row justify-content-center align-items-center">
                        <div id="login-column" class="col-md-6">
                            <div id="login-box" class="col-md-12">
                                <form id="login-form" class="form" action="" method="post" onSubmit={this.handleSubmit}>
                                    <h3 class="text-center text-info">StockPro</h3>
                                    <div class="form-group">
                                        <label for="username" class="text-info">Email:</label>
                                        <br></br>
                                        <input type="text" name="username" id="username" class="form-control" onChange={e => this.setState({ email: e.target.value })} required />
                                    </div>
                                    <div class="form-group">
                                        <label for="password" class="text-info">Password:</label>
                                        <br></br>
                                        <input type="password" name="password" id="password" class="form-control" onChange={e => this.setState({ password: e.target.value })} required />
                                    </div>
                                    <div class="form-group">
                                        {/* <label for="remember-me" class="text-info">
                                            <span>Remember me</span> <span> <input id="remember-me" name="remember-me" type="checkbox" /> </span>
                                        </label>
                                        <br></br> */}
                                        <input type="submit" name="submit" class="btn btn-info btn-md" value="submit" />
                                    </div>
                                    <div id="register-link" class="text-right">
                                        <a href="/signup" class="text-info">Register here</a>
                                    </div>
                                </form>
                                {/* <p>{this.state.responseToPost}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
