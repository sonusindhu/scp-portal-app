import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../hooks";
import { useLoading } from "../../hooks/useLoading";
import { LoadingButton } from "../../shared/components/Loading";
import { ROUTES } from "../../utils/constants.util";

const REDIRECT_AFTER_LOGIN = ROUTES.COMPANY_LIST;

const Login = () => {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();
  const { isLoading, withLoading } = useLoading();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username: string = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e: React.FormEvent) => {
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

    const result = await withLoading(loginUser(username.trim(), password));
    
    if (result.success) {
      navigate(REDIRECT_AFTER_LOGIN, { replace: true });
    } else {
      setMessage(result.error || "Login failed");
    }
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <LoadingButton
                type="submit"
                loading={isLoading}
                loadingText="Signing in..."
                className="login-button"
                fullWidth
                variant="contained"
              >
                Submit
              </LoadingButton>
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
