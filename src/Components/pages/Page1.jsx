import React from 'react';
// import './Page1.css'; // si quieres estilos separados

const Page1 = () => {
return (
    <div className="feria-container">
    <h1>¡Llegó el momento de estrenar su carro!</h1>
    <p>
        Estrene carro y aproveche los beneficios que tenemos: <br />
        <strong>Tasas especiales</strong>, aprobación desde la App en <strong>5 minutos</strong> y planes de financiación a la medida.
    </p>
    <button className="btn-conocer">Conocer más</button>

    <div className="card-feria">
        <img src="/carro-negro.png" alt="Carro en promoción" />
        <p>Lo esperamos en la feria nacional del vehículo</p>
        <span>Del 14 al 28 noviembre 2025</span>
    </div>
    </div>
);
};

export default Page1;