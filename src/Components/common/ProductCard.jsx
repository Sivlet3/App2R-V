import './ProductCard.css';
import { Link } from 'react-router-dom';

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
        <Link 
            to="/calculadora"
            state={{ product }}      // 👉 AQUÍ SE ENVÍA EL PRODUCTO
            className="btn-outline" >Simular </Link> )}

        <a href="/solicitar" className="btn-primary">Solicitar</a>
    </div>
    </div>
</div>
);
};

export default ProductCard;
