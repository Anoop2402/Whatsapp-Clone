import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar'
import './App.css';
import Chat from "./Components/Chat/Chat";

function App() {
  return (
    <div className="App">
    

      <div className="app__body">
      <Sidebar />
      <Chat />

      </div>
    </div>
  );
}

export default App;
