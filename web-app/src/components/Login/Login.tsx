import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../hooks";
const REDIRECT_AFTER_LOGIN = "/app/company/list";

const Login = () => {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();
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
    setLoading(true);

    const result = await loginUser(username.trim(), password);
    
    if (result.success) {
      navigate(REDIRECT_AFTER_LOGIN, { replace: true });
    } else {
      setLoading(false);
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
