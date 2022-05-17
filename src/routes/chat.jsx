import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Chat() {
  const [userName, setUserName] = useState('Borjomi');
  const [chatMessages, setChatMessages] = useState([
  ]);
  const [newMessage, setNewMessage] = useState('');

  const webSocket = useRef();

  useEffect(() => {
    async function fetchMyApi(){
      const response = await axios.get('http://localhost:8000/api/current_user',{withCredentials: true});
      const userName = response.data;
      setUserName(userName);

      const messagesFromDbResponse = await axios.get('http://localhost:8000/api/messages', {withCredentials: true});

      const newMessages = messagesFromDbResponse.data.map((e) => [e.sender, e.message]);

      setChatMessages(newMessages);

      // console.log(messagesFromDbResponse)

      webSocket.current = new WebSocket('ws://localhost:8000/api/chat');

      webSocket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        const sender = data['sender'];
        const text = data['message'];

        setChatMessages(oldChatMessages => [...oldChatMessages, [sender, text]]);
      }
    }
    fetchMyApi();
  }, []);

    const sendMessage = () => {
      if (webSocket.OPEN !== webSocket.readyState) { return }
      webSocket.current.send(JSON.stringify(
        {
          "sender": userName,
          "message": newMessage,
        }
      ));

      setNewMessage('');
    }

    return (
      <main style={{ padding: "1rem 0" }}>
        
        <h2>Chat</h2>
        <h2>User Name = {userName}</h2>
        <h2>New chat message = {newMessage}</h2>
        {chatMessages.map((chatMessage, index) => {
          const [sender, text] = chatMessage;

          return (
            <div key = {index}>
              <strong>{sender}</strong>: {text};
            </div>
          );
        })}
        <input onChange={(event) => {
          event.preventDefault();
          setNewMessage(event.target.value);
          }} value = {newMessage}/>
        <Button variant = 'primary' onClick={
          sendMessage
        }>Send</Button>
      </main>
    );
  }
