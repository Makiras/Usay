import React from "react";
import { Routes, Route } from "react-router-dom";

import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Verify from './pages/verify';
import Sign from './pages/sign';
import Footer from "./component/footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <div style={{ height: '40px' }}></div> */}
      <Footer/>
    </div>
  );
}

export default App;