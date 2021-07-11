import React from "react";

export const Login = ({ handleLogin }) => {
  return (
    <div>
      <h2>Login</h2>
      <p>
        Please login for access to your to do lists made with MySky from{" "}
        <a href="https://siasky.net/" target="_blank">
          Skynet
        </a>
      </p>
      <button onClick={handleLogin}>login</button>
    </div>
  );
};
