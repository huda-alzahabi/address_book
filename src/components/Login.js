import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = () => {
  const nav = useNavigate();
  // States for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
    } else {
      login();
      setEmail("");
      setPassword("");
      setSubmitted(true);
      setError(false);
    }
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
  const register = () => {
    nav("/Signup");
  };

  //Sending the user to the users table in the db
  const login = async () => {
    let _data = {
      email: email,
      password: password,
    };

    const res = await fetch("http://127.0.0.1:3030/api/user/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });
    const result = await res.json();
    console.log(result.token);
    window.localStorage.setItem("Bearer", result.token);
    var user = jwt_decode(result.token);
    window.localStorage.setItem("user_id", user._id);
    console.log(user);
    nav("/Contacts");
  };

  return (
    <div className="background">
      <div className="container ">
        <div>
          <h1>Sign in Here</h1>
        </div>

        <div className="messages">{errorMessage()}</div>

        <form>
          {/* Labels and inputs for form data */}

          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            placeholder={"Email"}
            type="email"
          />

          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            placeholder={"Password"}
            type="password"
          />

          <div className="centerbtn">
            <Button
              color={"rgb(222 214 211)"}
              text={"Login"}
              onClick={handleSubmit}
            />
          </div>
          <div>
            <h1>Don't Have an account?</h1>
            <h2
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => register()}
            >
              Register
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
