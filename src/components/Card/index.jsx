import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ id, titulo, categoria, link, descripcion, color, onDelete, onEdit }) {
  // Función para obtener la URL de la portada de YouTube
  function obtenerPortadaUrl(videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  // Función para obtener la ID del video de YouTube desde el enlace
  function obtenerVideoId(url) {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname === '/watch') {
      return urlObj.searchParams.get('v');
    } else if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.substr(1); // Obtiene la ID después del último /
    } else if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname.startsWith('/embed/')) {
      return urlObj.pathname.split('/').pop(); // Obtiene la ID desde /embed/VIDEO_ID
    }
    return null; // Devuelve null si no es un enlace válido de YouTube
  }

  // Obtener la ID del video desde el enlace proporcionado
  const videoId = obtenerVideoId(link);

  // Construir la URL de la portada del video de YouTube
  const portadaUrl = videoId ? obtenerPortadaUrl(videoId) : '';

  // Estilos personalizados para el borde de la tarjeta
  const bordeFosfo = {
    border: `2px solid ${color}`,
    boxShadow: `0 0 15px ${color}`,
  };

  return (
    <div className={styles.container} style={bordeFosfo}>
      <Link className={styles.link} to={`/${id}`}>
        <img src={portadaUrl} alt={titulo} className={styles.capa} />
      </Link>
      <div className={styles.content}>
        <div className={styles.menuBorrar}>
          <button className={styles.botonBorrar} onClick={() => onDelete(id)}>
            <i className="fa-regular fa-trash-can"></i>
            <p>BORRAR</p>
          </button>
          <button className={styles.botonEditar} onClick={() => onEdit(id)}>
            <i className="fa-regular fa-pen-to-square"></i>
            <p>EDITAR</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
