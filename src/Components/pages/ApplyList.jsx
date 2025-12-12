import React, { useEffect, useState } from 'react';
import { getApplications, deleteApplication } from '../../firebase/creditApplicationsCRUD';
import '../styles/ApplyList.css';

const ApplicationsList = () => {
const [applications, setApplications] = useState([]);
const [loading, setLoading] = useState(true);

// Cargar solicitudes desde Firebase
const fetchApplications = async () => {
try {
    const data = await getApplications();
    setApplications(data);
} catch (error) {
    console.error("Error al cargar solicitudes:", error);
} finally {
    setLoading(false);
}
};

useEffect(() => {
fetchApplications();
}, []);

// Eliminar solicitud
const handleDelete = async (id) => {
if (window.confirm("¿Deseas eliminar esta solicitud?")) {
    try {
    await deleteApplication(id);
    setApplications(prev => prev.filter(app => app.id !== id));
    } catch (error) {
    console.error("Error al eliminar:", error);
    }
}
};

if (loading) return <p>Cargando solicitudes...</p>;

return (
<div className="container section">
    <h1>Solicitudes de Crédito</h1>
    {applications.length === 0 ? (
    <p>No hay solicitudes registradas.</p>
    ) : (
    <table className="applications-table">
        <thead>
        <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Email</th>
            <th>Tipo de Crédito</th>
            <th>Monto</th>
            <th>Plazo</th>
            <th>Estado</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {applications.map(app => (
            <tr key={app.id}>
            <td>{app.nombre}</td>
            <td>{app.cedula}</td>
            <td>{app.email}</td>
            <td>{app.tipoCredito}</td>
            <td>{new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP'}).format(app.montoSolicitado)}</td>
            <td>{app.plazoSolicitado} meses</td>
            <td>{app.estado}</td>
            <td>
                <button onClick={() => handleDelete(app.id)}>Eliminar</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    )}
</div>
);
};

export default ApplicationsList;
