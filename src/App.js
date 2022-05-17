import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [userName, setUserName] = useState('DefaultValue')

  const navigate = useNavigate();

  const registerUser = async () => {
    await axios.post('http://localhost:8000/api/register', {
      username: userName
  }, {withCredentials: true});
    navigate('/chat')
  }

  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
      </nav>
      <h1>userName = {userName}</h1>
      <input onChange={(event)=>{setUserName(event.target.value)}}></input>
      <button onClick={registerUser}> Register User </button>
    </div>
  );
}