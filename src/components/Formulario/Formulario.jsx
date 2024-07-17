//  import styles from "./Formulario.module.css";
//  import CampoTexto from "../CampoTexto/CampoTexto";
//  import ListaOpciones from "../ListaOpciones/ListaOpciones";
//  import BotonGuardar from "../BotonGuardar/BotonGuardar";
//  import { useState } from "react";


//  const Formulario = (props) => {

//      const [titulo, setTitulo] = useState("")
//      const [imagen, setImagen] = useState("")
//      const [video, setVideo] = useState("")
//      const [categoria, setCategoria] = useState("")

//      const { registrarVideo } = props

//       const manejarEnvio = (e) => {
//          e.preventDefault()
//          console.log("manejar envio")
//          let datosAEnviar = {
//              titulo,
//              imagen,
//              video, 
//              categoria
//          }
//          registrarVideo(datosAEnviar)
//      }

//      return <section className={styles.formulario}>
//          <form onSubmit={manejarEnvio}>
//              <h1>Nuevo video</h1>
//              <h3>Complete el formulario para crear una nueva tarjeta de video</h3>
//              <h2>Crear Tarjeta</h2>

//              <CampoTexto 
//              titulo="Título" 
//              placeholder="ingrese el título" 
//              required 
//              valor={titulo} 
//              setValor={setTitulo} 
//              />


//              <ListaOpciones 
//              valor={categoria}
//              setValor={setCategoria}
//              />

//              <CampoTexto 
//              titulo="Imagen" 
//              placeholder="el enlace es obligatorio" 
//              required 
//              valor={imagen} 
//              setValor={setImagen}
//              />

//              <CampoTexto 
//              titulo="Video" 
//              placeholder="ingrese el enlace del video" 
//              required 
//              valor={video} 
//              setValor={setVideo}
//              />

//              <BotonGuardar />
//          </form>



//      </section>
//  }

//  export default Formulario

import styles from "./Formulario.module.css";
import CampoTexto from "../CampoTexto/CampoTexto";
import ListaOpciones from "../ListaOpciones/ListaOpciones";
import BotonGuardar from "../BotonGuardar/BotonGuardar";
import { useState } from "react";

const Formulario = ({ registrarVideo }) => {
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState("");
  const [video, setVideo] = useState("");
  const [categoria, setCategoria] = useState("");

  const [descripcion, setDescripcion] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    try {
      new URL(video); // Validar URL del video
      const datosAEnviar = { titulo, imagen, video, categoria, descripcion};
      registrarVideo(datosAEnviar);
      setTitulo("");
      setImagen("");
      setVideo("");
      setCategoria("");

      setDescripcion("");
    } catch (error) {
      console.error("Invalid video URL:", video);
      alert("Please enter a valid URL for the video.");
    }
  };

  return (
    <section className={styles.formulario}>
      <form onSubmit={manejarEnvio}>
        <h1>Nuevo video</h1>
        <h3>Complete el formulario para crear una nueva tarjeta de video</h3>
        <h2>Crear Tarjeta</h2>
        <CampoTexto
          titulo="Título"
          placeholder="ingrese el título"
          required
          valor={titulo}
          setValor={setTitulo}


        />
        <ListaOpciones valor={categoria} setValor={setCategoria} />
        {/* <CampoTexto
          titulo="Imagen"
          placeholder="el enlace es obligatorio"
          required
          valor={imagen}
          setValor={setImagen}
        /> */}
        <CampoTexto
          titulo="Video"
          placeholder="ingrese el enlace del video"
          required
          valor={video}
          setValor={setVideo}
        />
        <CampoTexto
          titulo="Descripción"
          placeholder="Ingrese la descripción del video"
          required
          valor={descripcion}
          setValor={setDescripcion}
          tipo="textarea"
        />
        <BotonGuardar />
      </form>
    </section>
  );
};

export default Formulario;


