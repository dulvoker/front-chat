import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [userName, setUserName] = useState('DefaultValue')
  const [avatarUrl, setAvatarUrl] = useState('')

  const navigate = useNavigate();

  const registerUser = async () => {
    await axios.post('http://localhost:8000/api/register', {
      username: userName,
      avatarURL: avatarUrl
  }, {withCredentials: true});
    navigate('/chat')
  }

  const generateAvatar = async() => {
    setAvatarUrl(`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg`);
  }

  useEffect(() => {
    generateAvatar();
  }, []);

  return (
    <div>
      <h1>Welcome to the chat!</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
      </nav>
      <h1>userName = {userName}</h1>
      {avatarUrl ? (
        <>
        < img src = {avatarUrl} width = {50} />
        <button onClick={generateAvatar}> New Avatar </button>
        <br/>
        </>
      ) : <p> No image</p> }
      <input onChange={(event)=>{setUserName(event.target.value)}}></input>
      <button onClick={registerUser}> Register User </button>
    </div>
  );
}