import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/Login'
import FilePage from './components/FilePage';
import FolderPage from './components/FolderPage'
import Item from "./components/Item"
import Register from "./components/Register"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
        <Route 
        path="/login" 
        element={<Login />} />
        <Route path=""/>
      </Routes>
     </Router>
    </>
  )
}

export default App
