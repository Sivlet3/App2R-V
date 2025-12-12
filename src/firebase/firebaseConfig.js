// Importar Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// CONFIGURACIÓN DE TU PROYECTO
// 👉 Esto lo sacas de la consola de Firebase > Configuración del proyecto > SDK Web
const firebaseConfig = {
apiKey: "AIzaSyBE4dqhT7EZ6GvHa48iogrWblMFO3-Hzos",
authDomain: "creditsmart-ea86f.firebaseapp.com",
projectId: "creditsmart-ea86f",
storageBucket: "creditsmart-ea86f.firebasestorage.app",
messagingSenderId: "9862080942",
appId: "1:9862080942:web:3eeb1e2204b2b297e8003f",
measurementId: "G-K4YMHJJT6R"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Firestore
export const db = getFirestore(app);
