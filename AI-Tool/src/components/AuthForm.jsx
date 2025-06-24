import React, { useState } from "react";
import "./AuthForm.css";

const AuthForm = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();

      if (res.ok) {
        alert(`Signup successful, ${signupData.username}`);
        window.location.href = "/";
      } else {
        alert("Signup failed: " + data.error);
      }
    } catch (err) {
      console.error("❌ Signup failed:", err);
      alert("Server error. Check backend is running.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // To send cookie
        body: JSON.stringify(loginData),
      });

      const text = await res.text();

      if (res.ok && text !== "You can't login") {
        alert("Login successful!");
        window.location.href = "/front";
      } else {
        alert("Login failed: " + text);
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      alert("Server error. Check backend is running.");
    }
  };

  return (
    <div className="body">
      <div className="main2">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="input2"
              type="text"
              name="username"
              placeholder="User name"
              required
              autoComplete="off"
              value={signupData.username}
              onChange={handleSignupChange}
            />
            <input
              className="input2"
              type="email"
              name="email"
              placeholder="Email"
              required
              autoComplete="off"
              value={signupData.email}
              onChange={handleSignupChange}
            />
            <input
              className="input2"
              type="tel"
              name="phone"
              placeholder="+91---"
              required
              autoComplete="off"
              value={signupData.phone}
              onChange={handleSignupChange}
            />
            <input
              className="input2"
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="new-password"
              value={signupData.password}
              onChange={handleSignupChange}
            />
            <button type="submit" className="button2">
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="input2"
              type="email"
              name="email"
              placeholder="Email"
              required
              autoComplete="off"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <input
              className="input2"
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="new-password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <button type="submit" className="button2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
