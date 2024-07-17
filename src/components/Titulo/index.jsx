import styles from "./Titulo.module.css"

function Titulo({children, color}) {
    return(
        <div className={styles.text} style={{background: `${color}`}}>
            {children}
        </div>
    )
}



export default Titulo;

