import React from "react";
import { ROUTE } from "./routes";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {auth} from './firebase/firebaseConfig';
import Snackbar from '@mui/material/Snackbar';
import { signInWithEmailAndPassword} from "firebase/auth";

const LoginStyles = styled.div`
  margin: 10px 10px;

  .login-title {
    font-size: 30px;
    font-weight: bold;
  }

  .center {
    text-align: center;
  }

  .login-button {
    margin-bottom: 10px;
  }

  .back-img {
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #cccccc;
  }

  .brand {
    background-image: url("img/brand.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }

  .tagline {
    margin-top: 100px;
    font-size: 20px;
  }

  .App-logo{
    height: 100px;
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false
    };
  }

  render() {
    return (
      <LoginStyles>
        <Grid container spacing={2} className="back-img">
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} className="center">
                <img src='img/branding-logo.jpg' className="App-logo" alt="logo"/>
              </Grid>
              <Grid item xs={12} className="center">
                <h2 className="login-title">Welcome Back</h2>
              </Grid>

              <Grid item xs={12} className="center">
                <TextField
                  id="email"
                  variant="outlined"
                  label="Email Address"
                  value={this.state.email}
                  onChange={(e) => this.onEmailChange(e)}
                />
              </Grid>

              <Grid item xs={12} className="center">
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  value={this.state.password}
                  onChange={(e) => this.onPasswordChange(e)}
                />
              </Grid>

              <Grid item xs={12} className="center">
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={this.handleSignIn}
                  disabled={
                    this.state.email.length > 0 &&
                    this.state.password.length > 0
                      ? false
                      : true
                  }
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className="brand">
            <Grid container spacing={2}>
              <Grid item xs={12} className="center tagline">
                <h2 className="login-title">Anureet Aviation Center</h2>
                <h3>Why be on Earth, when you can fly high?</h3>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          open={this.state.error}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message="Failed to login... Please try again"
        />
      </LoginStyles>
    );
  }

  handleClose = () => {
    this.setState({ error: !this.state.error });
  }

  handleSignIn = () => {
    const { email, password } = this.state;

    signInWithEmailAndPassword(auth, email, password)
    .then((x) => {
      this.handleClose();
      this.props.history.push({ pathname: ROUTE.DASHBOARD, state: { iLogin: true }});
    }).catch((x) => {
      this.handleClose();
    })
  };

  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
}

export default Login;
