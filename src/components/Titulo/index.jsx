import styles from "./Titulo.module.css"

function Titulo({children, color}) {
    return(
        <div
  className={styles.text}
  style={{
    background: 'transparent',        // Fondo
    borderColor: `${color}`, // Color del borde
    color: `${color}`           // Color del texto
  }}
>
  {children}
</div>

    )
}



export default Titulo;

//; borderColor: `${color}`