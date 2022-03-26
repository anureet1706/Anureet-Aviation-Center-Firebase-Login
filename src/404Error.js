import React from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "./routes";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Button from "@mui/material/Button";
import {auth} from "./../node_modules/firebase/auth"

const ErrorPageStyles = styled.div`
  margin: 10px 10px;

  .error-title {
    font-size: 45px;
    font-weight: bold;
  }

  .center {
    text-align: center;
  };

  .error-msg {
    font-size: 25px;
  };

  background-image: url("img/brand.jpg");
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

  .error-button {
    margin-bottom: 10px;
  }

  .App-logo{
    height: 100px;
    top:0;
  }
`;

export const ErrorPage = React.memo(() => (
  <ErrorPageStyles>
    <Grid container spacing={2} className="back-img">
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} className="center">
            <img src='img/branding-logo.jpg' className="App-logo" alt="logo"/>
          </Grid>
          <Grid item xs={12} className="center">
            <h2 className="error-title">404</h2>
          </Grid>
          <Grid item xs={12} className="center error-msg">
            <strong>Sorry... Page not found</strong>
          </Grid>

          <Grid item xs={12} className="center">
            <Button
              component={Link}
              to={ROUTE.DASHBOARD}
              variant="contained"
              className="error-button"
            >
              Back to Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </ErrorPageStyles>
));
