import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link className="nav-link" to="/">Inicio</Link>
        <Link className="nav-link" to="/catalogo">Catálogo</Link>
        <Link className="nav-link" to="/solicitar">Solicitar Crédito</Link>
    </nav>
    </div>
</header>
);
};

export default Header;

