import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/common/layout/Header';
import Footer from './Components/common/layout/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import Home from './Components/pages/Home';
import Simulator from './Components/pages/Simulador';
import Apply from './Components/pages/Apply';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulador" element={<Simulator />} />
          <Route path="/solicitar" element={<Apply />} />
        </Routes>
        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;