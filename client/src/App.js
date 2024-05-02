
import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import pms from './assests/pms-logo.png'

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    
    <div className="App">
<div className="pms_image">
  <img src={pms} alt="pms" style={{ width: '60vh', height: 'auto' }} />
</div>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>PMS Chat app </h3>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App