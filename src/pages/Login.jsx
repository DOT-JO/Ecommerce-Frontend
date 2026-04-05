import React, { useState } from 'react';
import axios from "axios";
import '../style/Login.css'
import { LoginUser } from '../services/authServices';
import { useNavigate, Link } from 'react-router-dom';  // ✅ add Link for register navigation

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");        // ✅ track error message
  const [loading, setLoading] = useState(false); // ✅ track loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // const res = await axios.post("http://localhost:8001/users/login", {
      //   email,
      //   password
      // });

      const res = await LoginUser({ email, password })
      console.log(res);

      localStorage.setItem("token", res.token)

      navigate("/");

    } catch (err) {
      console.log(err.response?.data || err.message);
      setError("Invalid email or password");  // ✅ show error to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page'>

      <form onSubmit={handleSubmit} className='login-form'>

        <h1 className="login-title">Sign In</h1>
        <p className="login-subtitle">Welcome back!</p>

        {/* ✅ show error if login fails */}
        {error && <p className="login-error">{error}</p>}

        <div className="login-field">
          <label>Email</label>
          <input
            type='email'
            placeholder='example@email.com'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type='password'
            placeholder='••••••••'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        {/* ✅ navigate to register if no account */}
        <p className="login-register-link">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>

      </form>
    </div>
  );
};

export default Login;