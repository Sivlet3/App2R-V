import React from 'react';
import ProductCard from '../components/common/ProductCard';
import { products } from '../data/products';
import './styles/Home.css';

const Home = () => {
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
        <p className="muted">Datos fijos — actividad S20 EA1</p>

        <div className="cards-grid" id="catalogCards">
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>
    </section>
    </main>
);
};

export default Home;