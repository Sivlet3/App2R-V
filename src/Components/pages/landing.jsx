import Home from "./Page1";
import Catalogo from "./Home2";
import Simulator from "./Simulador";
import Formulario from "./Apply";

export default function Landing() {
return (
    <>
    <section id="home">
        <Home />
    </section>

    <section id="catalogo">
        <Catalogo />
    </section>

    <section id="Simulator">
        <Simulator />
    </section>

    <section id="formulario">
        <Formulario />
    </section>


    </>
    

);
}
