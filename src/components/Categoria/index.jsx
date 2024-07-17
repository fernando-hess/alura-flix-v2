import React, { useEffect, useState } from "react";
import Titulo from "../Titulo";
import styles from "./Categoria.module.css";
import Card from "../Card";
import ModalEditar from "../ModalEditar";

const Categoria = (props) => {
  const [videos, setVideos] = useState([]);
  const [videoSeleccionado, setVideoSeleccionado] = useState(null);

  useEffect(() => {
    fetch("https://66927881346eeafcf46d06de.mockapi.io/api/v1/videos")
      .then(response => response.json())
      .then(data => {
        console.log("Data fetched:", data);
        setVideos(data);
      });
  }, []);

  const { color, titulo } = props.datos;

  const formatearTitulo = (titulo) => {
    return titulo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "");
  };

  const tituloFormateado = formatearTitulo(titulo);

  const handleDelete = (id) => {
    // Elimina el video de la lista localmente
    setVideos(videos.filter((video) => video.id !== id));
  };

  const alSeleccionarVideo = (id) => {
    const video = videos.find((video) => video.id === id);
    console.log("Video seleccionado para editar:", video);
    setVideoSeleccionado(video); // Establece el video seleccionado para edición
  };

  // Ejemplo de cómo podrías implementar onSave en el componente padre
const handleSaveVideo = (updatedVideo) => {
  fetch(`https://66927881346eeafcf46d06de.mockapi.io/api/v1/videos/${updatedVideo.id}`, {
    method: 'PUT', // O PATCH según corresponda con tu API
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedVideo),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al actualizar el video');
    }
    return response.json();
  })
  .then(data => {
    console.log('Video actualizado en la API:', data);
    // Aquí podrías actualizar tu estado local si lo necesitas
  })
  .catch(error => {
    console.error('Error al actualizar el video en la API:', error);
    // Manejar el error si es necesario
  });
};


  return (
    <section className={styles.categoria}>
      <Titulo color={color}>
        <h1>{titulo}</h1>
      </Titulo>

      <section className={styles.container}>
        {videos
          .filter(video => formatearTitulo(video.categoria) === tituloFormateado)
          .map(video => (
            <Card {...video} key={video.id} color={color} onDelete={handleDelete} onEdit={alSeleccionarVideo} />
          ))}
      </section>

      {videoSeleccionado && (
        // Dentro del componente padre donde usas ModalEditar
<ModalEditar
  video={videoSeleccionado}
  onClose={() => setVideoSeleccionado(null)}
  onSave={handleSaveVideo}
/>
      )}
    </section>
  );
};

export default Categoria;




