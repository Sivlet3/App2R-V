// creditApplicationsCRUD.js
import { db } from './firebaseConfig.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Nombre de la colección
const collectionName = 'creditApplications';

// ======================================================
// 1️⃣ Agregar nueva solicitud
// ======================================================
export const addApplication = async (applicationData) => {
try {
const docRef = await addDoc(collection(db, collectionName), {
    ...applicationData,
    fecha: new Date().toISOString(),
    estado: 'pendiente' // valor inicial
});
return docRef.id;
} catch (error) {
console.error('Error al agregar solicitud:', error);
throw error;
}
};

// ======================================================
// 2️⃣ Obtener todas las solicitudes
// ======================================================
export const getApplications = async () => {
try {
const querySnapshot = await getDocs(collection(db, collectionName));
const applications = [];
querySnapshot.forEach((doc) => {
    applications.push({ id: doc.id, ...doc.data() });
});
return applications;
} catch (error) {
console.error('Error al obtener solicitudes:', error);
throw error;
}
};

// ======================================================
// 3️⃣ Actualizar solicitud existente
// ======================================================
export const updateApplication = async (id, updatedData) => {
try {
const docRef = doc(db, collectionName, id);
await updateDoc(docRef, updatedData);
} catch (error) {
console.error('Error al actualizar solicitud:', error);
throw error;
}
};

// ======================================================
// 4️⃣ Eliminar solicitud
// ======================================================
export const deleteApplication = async (id) => {
try {
const docRef = doc(db, collectionName, id);
await deleteDoc(docRef);
} catch (error) {
console.error('Error al eliminar solicitud:', error);
throw error;
}
};
