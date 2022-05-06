import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { UserContext } from "./App";
import Axios from "axios";
function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const { CurrentUser, setCurrentUser } = useContext(UserContext);
  const [IsValidUser, setIsValidUser] = useState(false);
  const addUser = () => {
    Axios.post("http://localhost:3001/addUser", {
      Username,
      Password,
    }).then(() => {
      alert("User Added Successfully");
      window.location.href = "/LoginUser";
    });
  };
  const checkUser = () => {
    Axios.get(
      `http://localhost:3001/user`,
      {
        params: {
          username: Username,
          password: Password,
        },
      }
    ).then((response) => {
      if (response.data.length > 0) {
        setIsValidUser(true);
        setCurrentUser(response.data[0]);
      } else {
        alert("Invalid Username or Password");
      }
    });
  };
  return (
    <div className="Login flex col">
      {!isRegister && <h1>Login</h1>}
      {isRegister && <h1>Register</h1>}

      <div className="flex col login-container">
        <div className="input-grp flex row">
          <h1>Username</h1>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Username"
          />
        </div>
        <div
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="input-grp flex row"
        >
          <h1>Password </h1>
          <input type="password" placeholder="Password" />
        </div>
        {!isRegister && <button onClick={() => checkUser()}>Login</button>}

        {isRegister && <button
          onClick={() => {
            addUser();
          }}
        >
          Register
        </button>}

        {IsValidUser ? (
          <Link to={"/MovieDashboard"}>
            <button>Proceed</button>
          </Link>
        ) : (
          ""
        )}
      </div>
      {isRegister && <h3>
        Already Have an Account ? <button className="link" onClick={()=>{
          setIsRegister(false);
        }}>Login</button>
      </h3>}
      {!isRegister && <h3>
        Not Registered ?{" "}
        <button className="link" onClick={()=>{
          setIsRegister(true);
        }}>Register</button>
      </h3>}
    </div>
  );
}

export default Login;
