import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register, login } from "../services/authApi";

const LoginForm = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setError("");
      onLoginSuccess(data);
    } catch (error) {
      setUsername("");
      setPassword("");
      setMessage("");
      setError("something went wrong during user loging");
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(username, password);
      setIsRegister(false);
      setMessage(data.message);
      setUsername("");
      setError("");
      setPassword("");
      setConformPassword("");
    } catch (error) {
      console.log("the error is :", error.message);
      setError("Something went wrong during register user");
      setMessage("");
    }
  };
  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    setError("");
    setMessage("");
  };
  return (
    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          {isRegister ? "Create Account" : "Login"}
        </h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-600 font-light text-lg">
        {isRegister
          ? "Looks like you are new here"
          : " We are glad to see you again!"}
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label className="text-gray-600 text-sm">Username</label>
          <input
            label="Username"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 text-sm">Password</label>
          <input
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter your password"
            required
          />
        </div>
        {isRegister ? (
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Confirm Password</label>
            <input
              label="Confirm Password"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
              type="password"
              className="w-full p-2 border rounded mt-2"
              placeholder="Enter your password again"
              required
            />
          </div>
        ) : (
          ""
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="t ext-green-600 text-sm mb-3">{message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <div>
          <p className="pt-4 text-gray-600 text-sm text-center">
            {isRegister
              ? "Already have an account ?"
              : "Dont have an account ?"}
            <Link to="" onClick={handleRegisterToggle}>
              {isRegister ? " Login" : " Create Account"}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
