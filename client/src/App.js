import React, { useState } from 'react';

import GameLoop from './components/GameLoop';
import Office from './components/Office';
import MyVideo from './components/MyVideo';
import VideoCalls from './components/VideoCalls';

import './App.css';
import { io } from 'socket.io-client';

const WEBRTC_SOCKET = io('http://localhost:8080');

function App() {
  const [socketConnected, setSocketConnected] = useState(false);
  WEBRTC_SOCKET.on('connect', () => {
    setSocketConnected(true);
  });
  return (
    <>
        <header>        
        </header>
        {socketConnected &&
          <main className="content">
              <GameLoop>
                <Office webrtcSocket={WEBRTC_SOCKET}/>
              </GameLoop>
              <VideoCalls webrtcSocket={WEBRTC_SOCKET}/>
              <MyVideo />
          </main>
        }
        <footer>
        </footer>
    </>
  );
}

export default App;