import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../../utils/api";
import sytles from "./style.module.css";
import TextInput from "../../components/TextInput";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from api.js
      const { accessToken, expires } = await login(username, password);

      // Store the token and expiry time
      localStorage.setItem("token", accessToken);
      localStorage.setItem("expiry", expires);

      // Optionally, store the user's role (you can decode the token or assign based on the username)
      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      localStorage.setItem("role", decodedToken.role);

      // Redirect based on the user's role
      const role = decodedToken.role;

      navigate(role === "admin" ? "/admin" : "/clients");
    } catch (error) {
      setError(error.message); // Show error if login fails
      console.error(error);
    }
  };

  return (
    <div className={sytles.mainContainer}>
      <div className={sytles.titleContainer}>
        <div>Login</div>
      </div>
      {error && <p className={sytles.errorLabel}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div className={sytles.inputContainer}>
          <label>Email:</label>
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isPassword={false}
            className={sytles.inputBox}
          />
        </div>
        <div className={sytles.inputContainer}>
          <label>Password:</label>
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            isPassword={true}
            className={sytles.inputBox}
          />
        </div>
        <div className={sytles.inputContainer}>
          <button className={sytles.inputButton} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
