import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Troubleshooting from './pages/troubleshooting';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/troubleshooting" element={<Troubleshooting/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
