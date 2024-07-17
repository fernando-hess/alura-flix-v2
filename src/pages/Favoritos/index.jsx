// import { useState } from "react"
// import Formulario from "../../components/Formulario/Formulario"
// import styles from "./Favoritos.module.css"

//  function Favoritos() {
    
//       const [videos, setVideos] = useState([])


//       const registrarVideo = (video) => {
//           console.log("Nuevo video", video)
//           setVideos([...videos, video])
//       }

//      return (
//          <>
//               <Formulario 
//                  registrarVideo={registrarVideo}
//              /> 
//          </>
//      )
//  }

//  export default Favoritos

import { useEffect, useState } from "react";
import Formulario from "../../components/Formulario/Formulario";
import styles from "./Favoritos.module.css";

function Favoritos() {
  const [videos, setVideos] = useState([]);

  const registrarVideo = async (video) => {
    console.log("Nuevo video", video);

    try {
      const dataToSend = {
        titulo: video.titulo,
        imagen: video.imagen,
        link: video.video, // Guardar la URL del video como 'link'
        categoria: video.categoria,
        
        descripcion: video.descripcion
      };

      const response = await fetch("https://66927881346eeafcf46d06de.mockapi.io/api/v1/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      // Guardar solo los campos necesarios en el estado local
      const nuevoVideo = {
        id: data.id,
        categoria: data.categoria,
        titulo: data.titulo,
        link: data.link, // Usar 'link' en lugar de 'video'
        descripcion: data.descripcion
      };
      setVideos((prevVideos) => [...prevVideos, nuevoVideo]);
    } catch (error) {
      console.error("Error al registrar el video:", error);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("https://66927881346eeafcf46d06de.mockapi.io/api/v1/videos");
        const data = await response.json();
        // Mapear los datos recibidos para asegurarse de usar 'link' en lugar de 'video'
        const videosActualizados = data.map((video) => ({
          id: video.id,
          categoria: video.categoria,
          titulo: video.titulo,
          link: video.video, // Usar 'link' en lugar de 'video'
        }));
        setVideos(videosActualizados);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <main className={styles.mainNuevoVideo}>
      <Formulario registrarVideo={registrarVideo} />
      {/* <div className={styles.videosContainer}>
        {videos.map((video) => (
          <div key={video.id}>
            <h3>{video.titulo}</h3>
            <img src={video.imagen} alt={video.titulo} />
            <a href={video.link} target="_blank" rel="noopener noreferrer">
              Ver video
            </a>
            <p>Categoría: {video.categoria}</p>
          </div>
        ))}
      </div> */}
      </main>
    </>
  );
}

export default Favoritos;






