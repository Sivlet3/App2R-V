/*import { db } from './firebase/firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import libreInversionImg from './Components/assets/libre invercion.png';
import vehiculoImg from './Components/assets/vehiculo.png';
import viviendaImg from './Components/assets/casa.png';
import educativoImg from './Components/assets/estudio.png';
import empresarialImg from './Components/assets/empresarial.png';

const creditsData = [
{
name: "Libre Inversión",
min: 1000000,
max: 50000000,
tasa: 19,
plazo: 60,
image: libreInversionImg,
description: "Uso libre para inversión o consumo. Proceso rápido y digital."
},
{
name: "Vehículo",
min: 3000000,
max: 80000000,
tasa: 13,
plazo: 84,
image:vehiculoImg,
description: "Financiación para compra de vehículos nuevos o usados."
},
{

name: "Vivienda",
min: 10000000,
max: 300000000,
tasa: 9,
plazo: 240,
image: viviendaImg,
description: "Compra, mejora o construcción de vivienda con condiciones preferenciales."
},
{

name: "Educativo",
min: 500000,
max: 30000000,
tasa: 12,
plazo: 60,
image: educativoImg,
description: "Financiación para estudios, pregrado o posgrado."
},
{

name: "Empresarial",
min: 5000000,
max: 500000000,
tasa: 11,
plazo: 120,
image: empresarialImg,
description: "Líneas para empresas y emprendedores con condiciones por volumen."
}
];

const seedFirestore = async () => {
    try {
        console.log('Iniciando carga de datos a Firestore');

        for (const credit of creditsData) {
            const docRef = await addDoc(collection(db, 'credits'), credit);
            console.log(`${credit.name} agregado con ID: ${docRef.id}`);
        }

        console.log('Todos los créditos fueron agregados exitosamente');
        console.log('En cuanto se persistan los registros, borrar este archivo');
        
        
        

    } catch (error) {
        console.error('Error al cargar datos: ', error);
        
    }
}

seedFirestore();
*/