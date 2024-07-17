// import { useState } from "react";
// import styles from "./CampoTexto.module.css";

// const CampoTexto = (props) => {
//   const manejarCambio = (e) => {
//     props.setValor(e.target.value);
//   };

//   return (
//     <div className={styles.campo}>
//       <label>{props.titulo}</label>
//       {props.tipo === "textarea" ? (
//         <textarea
//           placeholder={props.placeholder}
//           value={props.valor}
//           onChange={manejarCambio}
//           required={props.required}
//         />
//       ) : (
//         <input
//           type="text"
//           placeholder={props.placeholder}
//           value={props.valor}
//           onChange={manejarCambio}
//           required={props.required}
//         />
//       )}
//     </div>
//   );
// };

// export default CampoTexto;

import React from 'react';
import styles from "./CampoTexto.module.css"

const CampoTexto = ({ titulo, placeholder, required, valor, setValor, tipo = "text" }) => {
  return (
    <div className={styles.campo}>
      <label>{titulo}</label>
      {tipo === "textarea" ? (
        <textarea
          placeholder={placeholder}
          required={required}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      ) : (
        <input
          type={tipo}
          placeholder={placeholder}
          required={required}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      )}
    </div>
  );
};

export default CampoTexto;

