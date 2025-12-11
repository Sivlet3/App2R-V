import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/common/layout/Header';
import Footer from './Components/common/layout/Footer';
import WhatsAppFloat from './Components/common/WhatsAppFloat';
import Apply from './Components/pages/Apply';
import Catalogo from './Components/pages/Catalogo';
import './App.css';
import Landing from './Components/pages/landing';
import Page1 from './Components/pages/Page1';
import Calculadora from './Components/pages/Calculadora';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/" element={<Landing />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/solicitar" element={<Apply />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/Calculadora" element={<Calculadora />} />

          

        </Routes>
        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;
