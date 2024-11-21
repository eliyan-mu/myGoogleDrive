import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setCurrentUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password.length < 3) {
        alert("password is too short");
        return;
      }
      const response = await fetch(`${url}/register`, {
        method: "POST",
        body: JSON.stringify({ name: name, password: password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      // Check if response is OK
      if (!response.ok) {
        const errorData = await response.json();
        alert("register failed: ", errorData);
        return;
      }

      const data = await response.json();
      alert("Registerd new user: ", data.user);

      console.log("data.user: ", data.user);
      setCurrentUser(data.user);

      navigate("/");
    } catch (error) {
      alert("An error occurred:", error);
      console.log("error: ", error);
    }
  };
  return (
    <div className="login-wrapper">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name </label>
        <br />
        <br />
        <input
          id="name"
          placeholder="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="password"> Password </label>
        <br />
        <br />
        <input
          id="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
