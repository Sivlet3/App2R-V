// aply para formulario y captura de datos 
import React, { useState } from 'react';
import { products } from '../data/product';
//import './styles/Apply.css';

const Apply = () => {
const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    tipoCredito: '',
    montoSolicitado: '',
    plazoSolicitado: '',
    destino: '',
    empresa: '',
    cargo: '',
    ingresos: ''
});

const [message, setMessage] = useState('');

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    setMessage('Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.');
    // Limpiar formulario
    setFormData({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    tipoCredito: '',
    montoSolicitado: '',
    plazoSolicitado: '',
    destino: '',
    empresa: '',
    cargo: '',
    ingresos: ''
    });
};

const clearForm = () => {
    setFormData({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    tipoCredito: '',
    montoSolicitado: '',
    plazoSolicitado: '',
    destino: '',
    empresa: '',
    cargo: '',
    ingresos: ''
    });
    setMessage('');
};

return (
    <main>
    <section className="container section">
        <h1>Solicitud de Crédito</h1>
        <p className="muted">Completa los datos para solicitar tu crédito. (*) campos obligatorios</p>

        <form id="solicitarForm" className="form-grid" onSubmit={handleSubmit} noValidate>
        <fieldset>
            <legend>Datos personales</legend>

            <label htmlFor="nombre">Nombre completo *</label>
            <input 
            id="nombre" 
            name="nombre" 
            className="input" 
            type="text" 
            value={formData.nombre}
            onChange={handleChange}
            required 
            />

            <label htmlFor="cedula">Cédula (sin puntos) *</label>
            <input 
            id="cedula" 
            name="cedula" 
            className="input" 
            type="number" 
            min="100000" 
            value={formData.cedula}
            onChange={handleChange}
            required 
            />

            <label htmlFor="email">Email *</label>
            <input 
            id="email" 
            name="email" 
            className="input" 
            type="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            />

            <label htmlFor="telefono">Teléfono *</label>
            <input 
            id="telefono" 
            name="telefono" 
            className="input" 
            type="tel" 
            pattern="[0-9]{7,15}" 
            value={formData.telefono}
            onChange={handleChange}
            required 
            />
        </fieldset>

        <fieldset>
            <legend>Datos del crédito</legend>

            <label htmlFor="tipoCredito">Tipo de crédito *</label>
            <select 
            id="tipoCredito" 
            name="tipoCredito" 
            className="input" 
            value={formData.tipoCredito}
            onChange={handleChange}
            required
            >
            <option value="">Seleccione...</option>
            {products.map(product => (
                <option key={product.id} value={product.name}>
                Crédito {product.name}
                </option>
            ))}
            </select>

            <label htmlFor="montoSolicitado">Monto solicitado (COP) *</label>
            <input 
            id="montoSolicitado" 
            name="montoSolicitado" 
            className="input" 
            type="number" 
            min="1000000" 
            value={formData.montoSolicitado}
            onChange={handleChange}
            required 
            />

            <label htmlFor="plazoSolicitado">Plazo en meses *</label>
            <select 
            id="plazoSolicitado" 
            name="plazoSolicitado" 
            className="input" 
            value={formData.plazoSolicitado}
            onChange={handleChange}
            required
            >
            <option value="">Seleccione...</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
            <option value="60">60</option>
            </select>

            <label htmlFor="destino">Destino del crédito</label>
            <textarea 
            id="destino" 
            name="destino" 
            className="input" 
            rows="3"
            value={formData.destino}
            onChange={handleChange}
            ></textarea>
        </fieldset>

        <fieldset>
            <legend>Datos laborales</legend>

            <label htmlFor="empresa">Empresa donde trabaja</label>
            <input 
            id="empresa" 
            name="empresa" 
            className="input" 
            type="text" 
            value={formData.empresa}
            onChange={handleChange}
            />

            <label htmlFor="cargo">Cargo</label>
            <input 
            id="cargo" 
            name="cargo" 
            className="input" 
            type="text" 
            value={formData.cargo}
            onChange={handleChange}
            />

            <label htmlFor="ingresos">Ingresos mensuales (COP) *</label>
            <input 
            id="ingresos" 
            name="ingresos" 
            className="input" 
            type="number" 
            min="0" 
            value={formData.ingresos}
            onChange={handleChange}
            required 
            />
        </fieldset>

        <div className="form-actions">
            <button type="submit" className="btn">Enviar Solicitud</button>
            <button type="button" onClick={clearForm} className="btn outline">Limpiar Formulario</button>
        </div>

        {message && (
            <div id="formMessage" className="muted" aria-live="polite" style={{marginTop: '10px'}}>
            {message}
            </div>
        )}
        </form>
    </section>
    </main>
);
};

export default Apply;