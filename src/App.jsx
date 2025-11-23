import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav/>
      <Outlet />
    </>
  )
}

export default App
