// import styles from "./BotonGuardar.module.css"

// const BotonGuardar = () => {
//     return <button className={styles.boton}>Guardar</button>
// }

// export default BotonGuardar;

// BotonGuardar.jsx

import styles from "./BotonGuardar.module.css"

const BotonGuardar = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.boton}>Guardar</button>
  );
};

export default BotonGuardar;
