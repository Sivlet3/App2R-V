import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, showSimulate = true }) => {
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
    }).format(amount);
};

 return (
    <div className="card">
    <img 
        src={product.image} 
        className="card-img-top" 
        alt={product.name}
    />
    <div className="card-body">
        <h5 className="card-title">Crédito {product.name}</h5>
        <p className="card-text">{product.description}</p>
        
        <ul className="card-meta">
        <li>
            <span><strong>Tasa:</strong></span>
            <span>{product.tasa}% anual</span>
        </li>
        <li>
            <span><strong>Monto:</strong></span>
            <span>{formatCurrency(product.min)} - {formatCurrency(product.max)}</span>
        </li>
        <li>
            <span><strong>Plazo:</strong></span>
            <span>{product.plazo} meses</span>
        </li>
        </ul>

        <div className="card-actions">
        {showSimulate && (
            <a href="/simulador" className="btn-outline">Simular</a>
        )}
        <a href="/solicitar" className="btn-primary">Solicitar</a>
        </div>
    </div>
    </div>
);
};

export default ProductCard;

/*const ProductCard = ({ product, showSimulate = true }) => {
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
    }).format(amount);
};

return (
    <article className="card" data-name={product.name} data-min={product.min} data-max={product.max} data-tasa={product.tasa} data-plazo={product.plazo}>
    <div className="card-img">
        <img src={product.image} alt={product.name} />
    </div>

    <div className="card-body">
        <h3 className="card-title">Crédito {product.name}</h3>
        <p className="card-desc">{product.description}</p>

        <ul className="card-meta">
        <li><strong>Tasa:</strong> {product.tasa}% anual</li>
        <li><strong>Monto:</strong> {formatCurrency(product.min)} - {formatCurrency(product.max)}</li>
        <li><strong>Plazo máximo:</strong> {product.plazo} meses</li>
        </ul>

        <div className="card-actions">
        {showSimulate && (
            <a href="/simulador" className="btn outline">Ver / Simular</a>
        )}
        <a href="/solicitar" className="btn">Solicitar</a>
        </div>
    </div>
    </article>
);
};

export default ProductCard;*/   