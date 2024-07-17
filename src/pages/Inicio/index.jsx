import Banner from "../../components/Banner";
import Titulo from "../../components/Titulo";
import Card from "../../components/Card";
// import videos from "../../data/db.json"
import styles from './index.module.css';
import { useEffect, useState } from "react";
import Categoria from "../../components/Categoria";
import ModalEditar from "../../components/ModalEditar";

function Inicio() {

    // const [videos, setVideos] = useState([])

    // useEffect(() => {
    //     fetch("https://my-json-server.typicode.com/fernando-hess/alura-flix-api/videos")
    //         .then(response => response.json())
    //         .then(data => {
    //             setVideos(data)
    //         })
    // }, [])

    

    const categorias = [
        {
            titulo: "Películas",
            color: "#FFD700" 
        },
        {
            titulo: "Música",
            color: "#FF1493" 
        },
        {
            titulo: "Documentales/Ciencia",
            color: "#00FF7F" 
        },
        {
            titulo: "Anime",
            color: "#9400D3" 
        },
        {
            titulo: "Videojuegos",
            color: "#FFA500" 
        },
        {
            titulo: "Deportes",
            color: "#FF4500" 
        },
        {
            titulo: "Aprendizaje",
            color: "#1E90FF" 
        }
        // {
        //     titulo: "Podcasts",
        //     color: "#FF69B4" 
        // },
        // {
        //     titulo: "Vlogs",
        //     color: "#32CD32" 
        // },
        // {
        //     titulo: "Lofi",
        //     color: "#8A2BE2" 
        // }
    ];
    

    //prueba modal editar
    // const [videoSeleccionado, setVideoSeleccionado] = useState(null)
     
    return (
        <>

            <Banner img="home" color="#0012d84e" />
            {/* <Titulo color="#6BD1F1">
                <h1>FRONT END</h1>
            </Titulo> */}

             {/* <section className={styles.container}>
                {videos.map((video) => {
                    return <Card {...video} key={video.id} />
                })}
            </section>

           
            <Titulo color="#00C86F">
                <h1>BACK END</h1>
            </Titulo>

            <section className={styles.container}>
                {videos.map((video) => {
                    return <Card {...video} key={video.id} />
                })}

            </section>

            <Titulo color="#FFBA05">
                <h1>INNOVACIÓN Y GESTIÓN</h1>
            </Titulo>

            <section className={styles.container}>
                {videos.map((video) => {
                    return <Card {...video} key={video.id} />
                })}

            </section>  */}

            {
                categorias.map( (categoria) => <Categoria datos={categoria} key={categoria.titulo} /> )
            }
            



            {/* <ModalEditar video={videoSeleccionado} /> */}
        </>
    )
}

export default Inicio;