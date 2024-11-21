import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Login({ currentUser, setCurrentUser }) {
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify({ name: name, password: password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      // Check if response is OK
      if (!response.ok) {
        const errorData = await response.json();
        alert("Login failed: ", errorData);
        return;
      }

      const data = await response.json();
      alert("Logged in user: ", data.user);

      setCurrentUser(data.user);

      navigate("/");
    } catch (error) {
      alert("An error occurred:", error);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          <p>Password</p>
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </label>
        <div>
          <NavLink to="Register">
            Don't have an account? Create one here!
          </NavLink>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
