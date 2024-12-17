import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx'
import Admin from './pages/admin.jsx'
import Ideas from './pages/ideas.jsx'
import Mentor from './pages/mentor.jsx'



const App = () => {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/mentor" element={<Mentor />} />
        </Routes>
      </Router>
    </>
  )
}

export default App