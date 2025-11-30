import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/common/layout/Header';
import Footer from './Components/common/layout/Footer';
import WhatsAppFloat from './Components/common/WhatsAppFloat';
import Simulator from './Components/pages/Simulador';
import Apply from './Components/pages/Apply';
import './App.css';
import Landing from './Components/pages/landing';
import Page1 from './Components/pages/Page1';
//import Home2 from './Components/pages/Home2';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/simulador" element={<Simulator />} />
          <Route path="/solicitar" element={<Apply />} />
          <Route path="/page1" element={<Page1 />} />

          

        </Routes>
        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;
/*
<Route path="/Landing" element={<Landing />} />
          <Route path="/simulador" element={<Simulator />} />
          <Route path="/solicitar" element={<Apply />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/home2" element={<Home2 />} />
*/