import React, { useState } from 'react';
import axios from "axios";
import '../style/Login.css'  
import { useNavigate, Link } from 'react-router-dom';  

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");       
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();                

  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8001/users/register", {
        name,
        email,
        password
      });

      // console.log(res);

      localStorage.setItem("token", res.data.token)

      navigate("/");  

    } catch (err) {
      console.log(err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page'>

      <form onSubmit={handlesubmit} className='login-form'>


        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">Join us today!</p>

        {error && <p className="login-error">{error}</p>}

        <div className="login-field">
          <label>Full Name</label>
          <input
            type='text'
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="login-register-link">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>

      </form>
    </div>
  );
};

export default Register;