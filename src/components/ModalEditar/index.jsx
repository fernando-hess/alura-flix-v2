import React, { useState, useEffect } from "react";
import CampoTexto from "../CampoTexto/CampoTexto";
import ListaOpciones from "../ListaOpciones/ListaOpciones";
import BotonGuardar from "../BotonGuardar/BotonGuardar";
import styles from "./ModalEditar.module.css";

const ModalEditar = ({ video, onClose, onSave }) => {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (video) {
      setTitulo(video.titulo);
      setCategoria(video.categoria);
      setVideoLink(video.link);
      setDescripcion(video.descripcion);
    }
  }, [video]);

  const handleSave = () => {
    const updatedVideo = {
      ...video,
      titulo,
      categoria,
      link: videoLink,
      descripcion
    };

    onSave(updatedVideo); // Llama a la función onSave pasando el video actualizado
    onClose(); // Cierra el modal después de guardar
  };

  if (!video) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <h2>Editar Video</h2>
        <CampoTexto
          titulo="Título"
          placeholder="Ingrese el título"
          required
          valor={titulo}
          setValor={setTitulo}
        />
        <ListaOpciones
          valor={categoria}
          setValor={setCategoria}
        />
        <CampoTexto
          titulo="Video"
          placeholder="Ingrese el enlace del video"
          required
          valor={videoLink}
          setValor={setVideoLink}
        />
        <CampoTexto
          titulo="Descripción"
          placeholder="Ingrese la descripción del video"
          required
          valor={descripcion}
          setValor={setDescripcion}
          tipo="textarea"
        />
        <div className={styles.botones} >
        <BotonGuardar onClick={handleSave} className={styles.BotonGuardarEditar} />
        <button type="button" onClick={onClose} className={styles.BotonGuardarCerrar} >Cerrar</button>
        </div>
      </div>
    </>
  );
}

export default ModalEditar;
