// aply para formulario y captura de datos 
import React, { useState, useEffect } from 'react';
import { products } from '../data/product';
import '../styles/Apply.css';

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
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

  // Carga datos guardados al iniciar
    useEffect(() => {
    const savedData = localStorage.getItem('creditFormData');
    if (savedData) {
        setFormData(JSON.parse(savedData));
    }
    }, []);

  // Guardar automáticamente en localStorage cuando cambien los datos
    useEffect(() => {
    localStorage.setItem('creditFormData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
        setErrors({
        ...errors,
        [name]: ''
        });
    }
    };

    const validateForm = () => {
    const newErrors = {};

    // Validaciones básicas
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
      // Simular envío a una API (puedes reemplazar con tu endpoint real)
        await submitToAPI(formData);
        
        setMessage('✅ Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.');
        
      // Guardar en historial de solicitudes
        saveToApplicationHistory(formData);
        
      // Limpiar formulario y localStorage
        clearForm();
        localStorage.removeItem('creditFormData');
        
    } catch (error) {
        setMessage('❌ Error al enviar la solicitud. Por favor, intente nuevamente.');
    } finally {
        setIsSubmitting(false);
    }
    };

  // Función para simular envío a API
    const submitToAPI = async (data) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    //  API real
    console.log('Datos enviados a la API:', data);
    
    // Ejemplo 
    /*
    const response = await fetch('https://tu-api.com/solicitudes', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Error en la solicitud');
    return response.json();
    */
    };

  // Guardar en historial de solicitudes
    const saveToApplicationHistory = (data) => {
    const history = JSON.parse(localStorage.getItem('creditApplicationsHistory') || '[]');
    const newApplication = {
        ...data,
        id: Date.now(),
        fecha: new Date().toISOString(),
        estado: 'pendiente'
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

            <label htmlFor="cedula">Cédula (sin puntos) *</label>
            <input 
                id="cedula" 
                name="cedula" 
                className={`input ${errors.cedula ? 'error' : ''}`}
                type="number" 
                min="100000" 
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
                pattern="[0-9]{7,15}" 
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
            {errors.tipoCredito && <span className="error-message">{errors.tipoCredito}</span>}

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
            {errors.montoSolicitado && <span className="error-message">{errors.montoSolicitado}</span>}

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
            {errors.plazoSolicitado && <span className="error-message">{errors.plazoSolicitado}</span>}

            <label htmlFor="destino">Destino del crédito</label>
            <textarea 
                id="destino" 
                name="destino" 
                className="input" 
                rows="3"
                value={formData.destino}
                onChange={handleChange}
                placeholder="Describe para qué usarás el crédito..."
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
                placeholder="Nombre de la empresa"
            />

            <label htmlFor="cargo">Cargo</label>
            <input 
                id="cargo" 
                name="cargo" 
                className="input" 
                type="text" 
                value={formData.cargo}
                onChange={handleChange}
                placeholder="Tu cargo o posición"
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
                min="0" 
                step="100000"
                value={formData.ingresos}
                onChange={handleChange}
                required 
            />
            {errors.ingresos && <span className="error-message">{errors.ingresos}</span>}
            </fieldset>

            <div className="form-actions">
            <button 
                type="submit" 
                className="btn primary" 
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
            <button type="button" onClick={clearForm} className="btn outline">
                Limpiar Formulario
            </button>
            </div>

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


/*
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

export default Apply;*/   