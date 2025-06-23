import React from "react";
import "./AuthForm.css";

const AuthForm = () => {
  return (
    <div className="body">
      <div className="main2">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form method="post">
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
            />
            <input
              className="input2"
              type="email"
              name="email"
              placeholder="Email"
              required
              autoComplete="off"
            />
            <input
              className="input2"
              type="tel"
              name="phone"
              placeholder="+91---"
              required
              autoComplete="off"
            />
            <input
              className="input2"
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="new-password"
            />
            <button type="submit" className="button2">
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form>
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
            />
            <input
              className="input2"
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="new-password"
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
