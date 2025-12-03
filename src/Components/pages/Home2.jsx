import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import { products } from '../data/product';
import Calculadora from './Calculadora';



// import './styles/Home.css'; - por si quiero agregar mas cosas de estilo 

const Home2 = () => {
return (
    <main>
    <section id="hero" className="hero container">
        <div className="hero-left">
        <h1>Catálogo de Créditos</h1>
        <p className="lead">Consulta nuestras opciones de crédito. Elige, simula y solicita en línea.</p>
        <Link className="btn primary" to="/Calculadora">Ir al simulador</Link>
        </div>

    </section>

    <section id="catalogo" className="container section">
        <h2>Productos disponibles</h2>
        <p className="muted"></p>

        <div className="cards-grid" id="catalogCards">
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>
    </section>
    </main>
);
};

export default Home2;