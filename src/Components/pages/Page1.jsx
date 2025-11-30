import React from 'react';
// import './Page1.css'; // si quieres estilos separados
import '../styles/Page1.css';
import { Link } from 'react-router-dom';
import './Simulador.jsx';

export default function Hero() {
return (
    <section className="hero-section">
    <div className="hero-left">
        <h1 className="hero-title">Disfrute tasas preferenciales</h1>
        <p className="hero-sub">
        Desde el 9%* E.A. con su Cuenta Pensión o Cuenta Nómina Davivienda activa.
        </p>

        <Link to="/Simulador">
        <button className="hero-btn">Conocer más</button>
</Link>

    </div>

    <div className="hero-right">
        <div className="floating-card">
        <img
            src="/promo-vivienda.png"
            alt="Promoción vivienda"
            className="promo-img"
        />
        </div>
        <div className="landing-section">
<div className="text">

</div>
<div className="image">

</div>
</div>

    </div>
    </section>
);
}