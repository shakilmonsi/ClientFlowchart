import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="btn">Login</button>
      </form>
      <div>
        <Link to="/register">signIn Now</Link>
      </div>

      <div className="mt-8 text-center text-white">
        {" "}
        {/* টেক্সট সাদা */}
        Don't have an account?{" "}
        <Link to="/register" className="text-white hover:underline font-medium">
          {" "}
          {/* টেক্সট সাদা */}
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
