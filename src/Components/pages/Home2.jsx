import React from 'react';
import ProductCard from '../common/ProductCard';
import { products } from '../data/product';
// import './styles/Home.css'; - por si se quiere agregar mas cosas de estilo 

const Home2 = () => {
return (
    <main>
    <section id="hero" className="hero container">
        <div className="hero-left">
        <h1>Catálogo de Créditos</h1>
        <p className="lead">Consulta nuestras opciones de crédito. Elige, simula y solicita en línea.</p>
        <a className="btn primary" href="/simulador">Ir al simulador</a>
        </div>

        <div className="hero-right">
        <div className="illustration-placeholder" aria-hidden="true">[Pensando]</div>
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