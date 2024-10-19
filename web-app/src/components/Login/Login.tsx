import React, { useState } from "react";

import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
} from "@material-ui/core";
import "./Login.css";
import AuthService from "../../services/auth.service";
import { ResponseModel } from "../../models/common.model";
const REDIRECT_AFTER_LOGIN = "/app/company/list";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username: string = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password: string = e.target.value;
    setPassword(password);
  };

  const handleSuccess = (response: ResponseModel) => {
    if (response.status) {
      window.location.href = REDIRECT_AFTER_LOGIN;
    } else {
      setLoading(false);
      setMessage(response.message);
    }
  }

  const handleError = (error) => {
    setLoading(false);
    let errprMessage = error.message;
    if (error.response) {
      errprMessage = error.response.data;
    } else if (error.request) {
      errprMessage = error.request;
    }
    setMessage(errprMessage);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    AuthService.login(username, password)
      .then(
        (response) => handleSuccess(response),
        (error) => handleError(error)
      )
      .catch((error) => handleError(error));
  };

  return (
    <div>
      {/* <AppBar position="static" color="primary">
        <Toolbar>
          <Grid container justifyContent="center" wrap="wrap">
            <Grid item>
              <Typography variant="h6">Supply Chain Portal</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> */}
      <Grid container spacing={0} justifyContent="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={2}
            className="login-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5" className="app-title">
                  SCP APP
                </Typography>

                <Typography component="h1" variant="h5" className="login-title">
                  Login
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleLogin}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="username"
                        variant="outlined"
                        value={username}
                        onChange={onChangeUsername}
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        value={password}
                        onChange={onChangePassword}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                        disabled={loading}
                      >
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
