import React from "react";

export const Login = ({ handleLogin }) => {
  return (
    <div className="container-login">
      <div className="card">
        <h2 className="mb-2">Login</h2>
        <p className="mb-2 mb-2 text-center">
          Please login for access to your to do lists made with MySky from{" "}
          <a href="https://siasky.net/" target="_blank">
            Skynet
          </a>
        </p>
        <button className="primary" onClick={handleLogin}>
          login
        </button>
      </div>
    </div>
  );
};
