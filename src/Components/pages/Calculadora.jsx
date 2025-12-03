import React, { useState } from 'react';
import '../styles/Calculadora.css'; // Opcional si deseas estilos

const Calculadora = () => {
const [monto, setMonto] = useState(10000);
const [plazo, setPlazo] = useState(12); // meses
const [tasa, setTasa] = useState(10); // tasa anual %
const [cuota, setCuota] = useState(0);
const [total, setTotal] = useState(0);

const calcularCuota = (e) => {
e.preventDefault();

const tasaMensual = tasa / 100 / 12;
const cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));

setCuota(cuotaMensual);
setTotal(cuotaMensual * plazo);
};

return (
<div className="simulador-container">
    <h1>Calculadora de Crédito</h1>

    <form onSubmit={calcularCuota}>
    <div className="form-group">
        <label htmlFor="monto">Monto del crédito:</label>
        <input
        type="number"
        id="monto"
        value={monto}
        onChange={(e) => setMonto(parseFloat(e.target.value))}
        min="0"
        step="100"
        />
    </div>

    <div className="form-group">
        <label htmlFor="plazo">Plazo (meses):</label>
        <input
        type="number"
        id="plazo"
        value={plazo}
        onChange={(e) => setPlazo(parseInt(e.target.value))}
        min="1"
        step="1"
        />
    </div>

    <div className="form-group">
        <label htmlFor="tasa">Tasa de interés anual (%):</label>
        <input
        type="number"
        id="tasa"
        value={tasa}
        onChange={(e) => setTasa(parseFloat(e.target.value))}
        min="0"
        step="0.1"
        />
    </div>

    <button type="submit">Calcular</button>
    </form>

    {cuota > 0 && (
    <div className="resultado">
        <h2>Resultado</h2>
        <p>Cuota mensual: ${cuota.toFixed(2)}</p>
        <p>Total a pagar: ${total.toFixed(2)}</p>
    </div>
    )}
</div>
);
};

export default Calculadora;
