import { Link } from "react-router-dom"
import styles from "./Cabecera.module.css"
import logo from "./LogoMain.png"
import CabeceraLink from "../CabeceraLink/CabeceraLink"

function Cabecera(){
    return(
        <header className={styles.cabecera}>
            <Link to="/">
                <section className={styles.logoContainer}>
                    <img src={logo} alt="Logo AluraFlix" />
                </section>
            </Link>
            <div>
            <CabeceraLink url="./">
                <button className={styles.botonHome}>Home</button>
            </CabeceraLink>
            <CabeceraLink url="./Favoritos">
               <button className={styles.nuevoVideo}>Nuevo video</button>
            </CabeceraLink>
            </div>
        </header>
    )
}

export default Cabecera;