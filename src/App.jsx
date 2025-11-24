import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

import './App.css'

function App() {
  const [userName, setUsername] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <Nav setUserId={setUserId} setUsername={setUsername} setToken={setToken} token={token} userId={userId} userName={userName}/>
      <Outlet context={{ token, userId, userName, setToken, setUserId, setUsername }}/>
    </>
  )
}

export default App
