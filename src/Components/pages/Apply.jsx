import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { products } from '../data/product';
import '../styles/Apply.css';
// Importamos nuestro CRUD
import { addApplication } from '../../firebase/creditApplicationsCRUD';

const Apply = () => {
const { state } = useLocation(); //pasa datos desde la calculadora

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
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);

// ======================================================
// AUTOCOMPLETAR DATOS DESDE LA CALCULADORA
// ======================================================
useEffect(() => {
if (state?.product && state?.simulation && state?.user) {
    setFormData(prev => ({
    ...prev,
    nombre: state.user.nombre,
    cedula: state.user.numero,
    email: state.user.email,
    tipoCredito: state.product.name,
    montoSolicitado: state.simulation.monto,
    plazoSolicitado: state.simulation.plazo,
    }));
}
}, [state]);

// ======================================================
// CARGAR DATOS DESDE LOCALSTORAGE SOLO SI NO VIENE DE CALCULADORA
// ======================================================
useEffect(() => {
if (state?.user || state?.simulation || state?.product) return;
const savedData = localStorage.getItem('creditFormData');
if (savedData) setFormData(JSON.parse(savedData));
}, [state]);

// ======================================================
// GUARDAR CAMBIOS AUTOMÁTICAMENTE EN LOCALSTORAGE
// ======================================================
useEffect(() => {
localStorage.setItem('creditFormData', JSON.stringify(formData));
}, [formData]);

// ======================================================
// HANDLERS
// ======================================================
const handleChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({ ...prev, [name]: value }));
if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
};

// ======================================================
// VALIDACIONES
// ======================================================
const validateForm = () => {
const newErrors = {};
if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
if (!formData.cedula || formData.cedula.length < 6) newErrors.cedula = 'Cédula inválida';
if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
if (!formData.telefono || formData.telefono.length < 7) newErrors.telefono = 'Teléfono inválido';
if (!formData.tipoCredito) newErrors.tipoCredito = 'Seleccione un tipo de crédito';
if (!formData.montoSolicitado || formData.montoSolicitado < 1000000) newErrors.montoSolicitado = 'Monto mínimo: $1.000.000';
if (!formData.plazoSolicitado) newErrors.plazoSolicitado = 'Seleccione un plazo';
if (!formData.ingresos || formData.ingresos < 0) newErrors.ingresos = 'Ingresos inválidos';
return newErrors;
};

// ======================================================
// ENVIAR FORMULARIO (ahora usando nuestro CRUD)
// ======================================================
const handleSubmit = async (e) => {
e.preventDefault();
setIsSubmitting(true);

const formErrors = validateForm();
if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    setIsSubmitting(false);
    return;
}

try {
    //  Guardar usando CRUD
    const newId = await addApplication(formData);
    console.log('Solicitud agregada con ID:', newId);

    setMessage('✅ Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.');

    saveToApplicationHistory(formData);

    clearForm();
    localStorage.removeItem('creditFormData');

} catch (error) {
    setMessage('❌ Error al enviar la solicitud. Por favor, intente nuevamente.');
    console.error(error);
} finally {
    setIsSubmitting(false);
}
};

const saveToApplicationHistory = (data) => {
const history = JSON.parse(localStorage.getItem('creditApplicationsHistory') || '[]');
const newApplication = {
    ...data,
    id: Date.now(),
    fecha: new Date().toISOString(),
    estado: 'pendiente',
};
history.push(newApplication);
localStorage.setItem('creditApplicationsHistory', JSON.stringify(history));
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
setErrors({});
setMessage('');
};

const formatCurrency = (value) => {
return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
}).format(value);
};

// ======================================================
// RENDER
// ======================================================
return (
<main>
    <section className="container section">
    <h1>Solicitud de Crédito</h1>
    <p className="muted">Completa los datos para solicitar tu crédito. (*) campos obligatorios</p>

    <form id="solicitarForm" className="form-grid" onSubmit={handleSubmit} noValidate>

        {/* DATOS PERSONALES */}
        <fieldset>
        <legend>Datos personales</legend>
        <label htmlFor="nombre">Nombre completo *</label>
        <input
            id="nombre"
            name="nombre"
            className={`input ${errors.nombre ? 'error' : ''}`}
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            required
        />
        {errors.nombre && <span className="error-message">{errors.nombre}</span>}

        <label htmlFor="cedula">Cédula *</label>
        <input
            id="cedula"
            name="cedula"
            className={`input ${errors.cedula ? 'error' : ''}`}
            type="number"
            value={formData.cedula}
            onChange={handleChange}
            required
        />
        {errors.cedula && <span className="error-message">{errors.cedula}</span>}

        <label htmlFor="email">Email *</label>
        <input
            id="email"
            name="email"
            className={`input ${errors.email ? 'error' : ''}`}
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <label htmlFor="telefono">Teléfono *</label>
        <input
            id="telefono"
            name="telefono"
            className={`input ${errors.telefono ? 'error' : ''}`}
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            required
        />
        {errors.telefono && <span className="error-message">{errors.telefono}</span>}
        </fieldset>

        {/* DATOS DEL CRÉDITO */}
        <fieldset>
        <legend>Datos del crédito</legend>

        <label htmlFor="tipoCredito">Tipo de crédito *</label>
        <select
            id="tipoCredito"
            name="tipoCredito"
            className={`input ${errors.tipoCredito ? 'error' : ''}`}
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

        <label htmlFor="montoSolicitado">
            Monto solicitado (COP) *
            {formData.montoSolicitado && (
            <span className="muted"> ({formatCurrency(parseInt(formData.montoSolicitado))})</span>
            )}
        </label>
        <input
            id="montoSolicitado"
            name="montoSolicitado"
            className={`input ${errors.montoSolicitado ? 'error' : ''}`}
            type="number"
            min="1000000"
            step="100000"
            value={formData.montoSolicitado}
            onChange={handleChange}
            required
        />

        <label htmlFor="plazoSolicitado">Plazo en meses *</label>
        <select
            id="plazoSolicitado"
            name="plazoSolicitado"
            className={`input ${errors.plazoSolicitado ? 'error' : ''}`}
            value={formData.plazoSolicitado}
            onChange={handleChange}
            required
        >
            <option value="">Seleccione...</option>
            <option value="12">12 meses</option>
            <option value="24">24 meses</option>
            <option value="36">36 meses</option>
            <option value="48">48 meses</option>
            <option value="60">60 meses</option>
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

        {/* DATOS LABORALES */}
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

        <label htmlFor="ingresos">
            Ingresos mensuales (COP) *
            {formData.ingresos && (
            <span className="muted"> ({formatCurrency(parseInt(formData.ingresos))})</span>
            )}
        </label>
        <input
            id="ingresos"
            name="ingresos"
            className={`input ${errors.ingresos ? 'error' : ''}`}
            type="number"
            value={formData.ingresos}
            onChange={handleChange}
            required
        />
        </fieldset>

        {/* BOTONES */}
        <div className="form-actions">
        <button type="submit" className="btn primary" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
        </button>

        <button type="button" onClick={clearForm} className="btn outline">
            Limpiar Formulario
        </button>
        </div>

        {/* MENSAJE */}
        {message && (
        <div
            id="formMessage"
            className={`message ${message.includes('✅') ? 'success' : 'error'}`}
            aria-live="polite"
        >
            {message}
        </div>
        )}
    </form>
    </section>
</main>
);
};

export default Apply;
