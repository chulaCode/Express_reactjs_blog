import React from "react";
import { useState, useRef } from "react";
import "../style.scss"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    user_type: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usertypeInputRef=useRef();
  const usernameInputRef = useRef();
 

  const navigate = useNavigate();

  const handleChange = (e) => {
   setInputs((prev) => (
    { 
      ...prev, [e.target.name]: e.target.value,
      user_type: usertypeInputRef.current.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res= await axios.post("auth/register", inputs);
     console.log(res);
     navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }/*
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUserType = usertypeInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    console.log(
      enteredUsername,
      enteredEmail,
      enteredPassword,
      enteredUserType
    );
  /* try {
    const url="http://localhost:8080/api/auth/register";
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          username: enteredUsername,
          user_type: enteredUserType,
          
        }),
        headers: {
          'Content-Type': 'application/json',
        },
   }).then((res) => {
        console.log("here",res);
        if (res.status === 200) {
          //navigate("/");
          //console.log("yes")
        }
      });
     
    } catch (err) {
      setError(err.response.data);
    }*/
  };
  

  return (
    <div className="auth">
      <h1 className="text-white">Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
       
         onChange={handleChange}
        />
         <input
          required
          type="hidden"
          name="user_type"
          value="users"
         ref={usertypeInputRef}
         onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

export async function action(){
    
}