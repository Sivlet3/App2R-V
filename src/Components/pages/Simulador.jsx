import React, { useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import { products } from '../data/products';
import './styles/Simulator.css';

const Simulator = () => {
const [searchName, setSearchName] = useState('');
const [rangeSelect, setRangeSelect] = useState('all');
const [filteredProducts, setFilteredProducts] = useState(products);

const applyFilters = () => {
    let filtered = products;

    // Filtrar por nombre
    if (searchName) {
    filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchName.toLowerCase())
    );
    }

    // Filtrar por rango de monto
    if (rangeSelect !== 'all') {
    const [min, max] = rangeSelect.split('-').map(Number);
    filtered = filtered.filter(product => 
        product.min >= min && product.max <= max
    );
    }

    setFilteredProducts(filtered);
};

const resetFilters = () => {
    setSearchName('');
    setRangeSelect('all');
    setFilteredProducts(products);
};

return (
    <main>
    <section className="container section">
        <h1>Simulador / Búsqueda de Créditos</h1>
        <p className="muted">Busca por nombre de producto y filtra por rango de monto.</p>

        <div className="filters-grid">
        <div>
            <label htmlFor="searchName">Buscar por nombre</label>
            <input 
            id="searchName" 
            className="input" 
            placeholder="Ej: Vehículo"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            />
        </div>

        <div>
            <label htmlFor="rangeSelect">Rango de monto</label>
            <select 
            id="rangeSelect" 
            className="input"
            value={rangeSelect}
            onChange={(e) => setRangeSelect(e.target.value)}
            >
            <option value="all">Todos los rangos</option>
            <option value="0-2000000">Hasta $2.000.000</option>
            <option value="2000001-10000000">$2.000.001 - $10.000.000</option>
            <option value="10000001-50000000">$10.000.001 - $50.000.000</option>
            <option value="50000001-999999999">Más de $50.000.000</option>
            </select>
        </div>

        <div style={{alignSelf: 'end'}}>
            <button onClick={applyFilters} className="btn">Aplicar filtros</button>
            <button onClick={resetFilters} className="btn outline">Restablecer</button>
        </div>
        </div>

        <hr style={{margin: '18px 0'}} />

        <div id="resultsGrid" className="cards-grid">
        {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} showSimulate={false} />
        ))}
        </div>
    </section>
    </main>
);
};

export default Simulator;