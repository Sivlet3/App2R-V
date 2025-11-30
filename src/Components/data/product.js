//Creacion de la informacion de la app de productos financieros
import libreInversionImg from '../assets/libre invercion.png';
import vehiculoImg from '../assets/vehiculo.png';
import viviendaImg from '../assets/casa.png';
import educativoImg from '../assets/estudio.png';
import empresarialImg from '../assets/empresarial.png';
export const products = [
  {
    id: 1,
    name: "Libre Inversión",
    min: 1000000,
    max: 50000000,
    tasa: 19,
    plazo: 60,
    image: libreInversionImg,
    description: "Uso libre para inversión o consumo. Proceso rápido y digital."
  },
  {
    id: 2,
    name: "Vehículo",
    min: 3000000,
    max: 80000000,
    tasa: 13,
    plazo: 84,
    image:vehiculoImg,
    description: "Financiación para compra de vehículos nuevos o usados."
  },
  {
    id: 3,
    name: "Vivienda",
    min: 10000000,
    max: 300000000,
    tasa: 9,
    plazo: 240,
    image: viviendaImg,
    description: "Compra, mejora o construcción de vivienda con condiciones preferenciales."
  },
  {
    id: 4,
    name: "Educativo",
    min: 500000,
    max: 30000000,
    tasa: 12,
    plazo: 60,
    image: educativoImg,
    description: "Financiación para estudios, pregrado o posgrado."
  },
  {
    id: 5,
    name: "Empresarial",
    min: 5000000,
    max: 500000000,
    tasa: 11,
    plazo: 120,
    image: empresarialImg,
    description: "Líneas para empresas y emprendedores con condiciones por volumen."
  }
];
export default products;