import React, { useState } from 'react';
import './Header.css';
const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

return (
    <header className="site-header">
    <div className="container header-inner">
        <div className="brand">
        <div className="logo-placeholder">CreditSmart</div>
        </div>

        <button 
        className="mobile-toggle" 
        aria-label="Abrir menú"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
        ☰
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
        <a className="nav-link" href="/">Inicio</a>
        <a className="nav-link" href="/simulador">Simulador</a>
        <a className="nav-link" href="/solicitar">Solicitar Crédito</a>
        </nav>
    </div>
    </header>
);
};
export default Header;
