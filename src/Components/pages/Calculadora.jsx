import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Calculadora.css'


const Calculadora = () => {
const { state } = useLocation();
const product = state?.product;
const navigate = useNavigate();

if (!product) {
return <p className="error-msg">❌ No se recibió información del producto.</p>;
}

//  Datos del cliente
const [nombre, setNombre] = useState('');
const [numero, setNumero] = useState('');
const [email, setEmail] = useState('');

//  Datos financieros
const [monto, setMonto] = useState(product.min);
const [plazo, setPlazo] = useState(product.plazo);
const [tasa, setTasa] = useState(product.tasa);
const [cuota, setCuota] = useState(0);
const [total, setTotal] = useState(0);

const calcularCuota = (e) => {
e.preventDefault();

// Validaciones básicas
if (!nombre || !numero || !email) {
    alert("Por favor completa tus datos personales.");
    return;
}

const tasaMensual = tasa / 100 / 12;
const cuotaMensual =
    (monto * tasaMensual) /
    (1 - Math.pow(1 + tasaMensual, -plazo));

setCuota(cuotaMensual);
setTotal(cuotaMensual * plazo);
};

const handleSolicitar = () => {
const simulation = { monto, plazo, tasa, cuota, total };
const user = { nombre, numero, email };

navigate('/solicitar', { 
    state: { 
    product, 
    simulation,
    user 
    } 
});
};

return (
<div className="simulador-container">

    <h1 className="title">Simulación de Crédito – {product.name}</h1>

    <form onSubmit={calcularCuota} className="simulador-form">

    {/*  DATOS DEL CLIENTE */}
    <h2 className="sub-title">Datos personales</h2>

    <div className="form-group">
        <label>Nombre completo:</label>
        <input
        type="text"
        value={nombre}
        placeholder="Ej: Juan Pérez"
        onChange={(e) => setNombre(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label>Número de identificación:</label>
        <input
        type="text"
        value={numero}
        placeholder="Ej: 1032456789"
        onChange={(e) => setNumero(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label>Correo electrónico:</label>
        <input
        type="email"
        value={email}
        placeholder="Ej: ejemplo@mail.com"
        onChange={(e) => setEmail(e.target.value)}
        />
    </div>

    <hr />

    {/*  DATOS FINANCIEROS */}
    <h2 className="sub-title">Datos del crédito</h2>

    <div className="form-group">
        <label>Monto:</label>
        <input
        type="number"
        value={monto}
        min={product.min}
        max={product.max}
        onChange={(e) => setMonto(parseFloat(e.target.value))}
        />
        <small>Mínimo: {product.min.toLocaleString()} • Máximo: {product.max.toLocaleString()}</small>
    </div>

    <div className="form-group">
        <label>Plazo (meses):</label>
        <input
        type="number"
        value={plazo}
        min="1"
        max={product.plazo}
        onChange={(e) => setPlazo(parseInt(e.target.value))}
        />
        <small>Plazo máximo: {product.plazo} meses</small>
    </div>

    <div className="form-group">
        <label>Tasa anual (%):</label>
        <input
        type="number"
        value={tasa}
        min="0"
        onChange={(e) => setTasa(parseFloat(e.target.value))}
        />
    </div>

    <button type="submit" className="btn-calcular">
        Calcular
    </button>
    </form>

    {cuota > 0 && (
    <div className="resultado">
        <h2>Resultado</h2>

        <p><strong>Cuota mensual:</strong> ${cuota.toFixed(2)}</p>
        <p><strong>Total a pagar:</strong> ${total.toFixed(2)}</p>

        <div className="acciones">
        <button className="btn-solicitar" onClick={handleSolicitar}>
            Continuar y Solicitar
        </button>

        <button className="btn-ajustar" onClick={() => { setCuota(0); setTotal(0); }}>
            Ajustar valores
        </button>
        </div>
    </div>
    )}
</div>
);
};

export default Calculadora;


