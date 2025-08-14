import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1 className="app-title">SCP APP</h1>
            <h2 className="login-title">Login</h2>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                name="username"
                value={username}
                onChange={onChangeUsername}
                required
                autoFocus
                className="form-input"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChangePassword}
                required
                className="form-input"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <button
                type="submit"
                className={`login-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading && <span className="spinner"></span>}
                {loading ? 'Signing in...' : 'Submit'}
              </button>
            </div>
          </form>
          
          {message && (
            <div className="error-message" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
