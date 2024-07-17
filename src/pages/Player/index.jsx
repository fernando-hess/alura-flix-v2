import styles from "./Player.module.css";
import Titulo from "../../components/Titulo";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import { useEffect, useState } from "react";

function Player() {
    const [video, setVideo] = useState([]);
    const parametros = useParams();

    useEffect(() => {
        fetch(`https://66927881346eeafcf46d06de.mockapi.io/api/v1/videos?id=${parametros.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const videoData = { ...data[0], link: convertToEmbedLink(data[0].link) };
                    setVideo(videoData);
                }
            });
    }, [parametros.id]);

    const convertToEmbedLink = (url) => {
        const urlObj = new URL(url);
        if (urlObj.hostname === "www.youtube.com" && urlObj.pathname === "/embed") {
            return url; // El enlace ya está en formato embed
        } else if (urlObj.hostname === "www.youtube.com" && urlObj.pathname === "/watch") {
            const videoId = urlObj.searchParams.get("v");
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
        }
        return url; // Devuelve el enlace original si no se puede convertir
    };

    if (!video) return <NotFound />;

    return (
        <>
            <main className={styles.mainPlayer}>
                {/* <Titulo color="#ea0000"> */}
                <h1 className={styles.tituloVideo}>{ video.titulo }</h1>
            {/* </Titulo> */}
            <section className={styles.container}>
                <iframe
                    width="100%"
                    height="100%"
                    src={video.link}
                    title={video.titulo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </section>
            </main>
        </>
    );
}

export default Player;
