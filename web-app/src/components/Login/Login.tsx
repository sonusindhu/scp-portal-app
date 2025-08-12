import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username: string = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setPassword(password);
  };

  const handleSuccess = (response: ResponseModel) => {
    if (response.status) {
      navigate(REDIRECT_AFTER_LOGIN, { replace: true });
    } else {
      setLoading(false);
      setMessage(response.message || "Login failed");
    }
  }

  const handleError = (error: any) => {
    setLoading(false);
    let errorMessage = "An unexpected error occurred";
    
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data?.message || error.response.data || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "Network error: Unable to connect to server";
    } else if (error.message) {
      // Something else happened
      errorMessage = error.message;
    }
    
    setMessage(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!username.trim() || !password.trim()) {
      setMessage("Please enter both email and password");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(username)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setMessage("");
    setLoading(true);

    AuthService.login(username.trim(), password)
      .then((response) => handleSuccess(response))
      .catch((error) => handleError(error));
  };

  return (
    <div>
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
