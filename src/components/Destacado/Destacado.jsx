import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import Titulo from "../Titulo";
import styles from "./Destacado.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.nextArrow}`}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#66f7ff',
        color: '#ffffff',
        borderRadius: '50%',
        padding: '10px',
        fontSize: '30px',
        cursor: 'pointer',
        zIndex: 1,
      }}
      onClick={onClick}
    >
      →
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.prevArrow}`}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#66f7ff',
        color: '#fff9f9',
        borderRadius: '50%',
        padding: '10px',
        fontSize: '30px',
        cursor: 'pointer',
        zIndex: 1,
      }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

const Destacado = () => {
  const [videos, setVideos] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://66927881346eeafcf46d06de.mockapi.io/api/v1/videos"
        );
        const data = await response.json();
        // Aleatorizar el arreglo de videos
        const shuffledVideos = shuffleArray(data);
        setVideos(shuffledVideos);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchVideos();
  }, []);

  const convertToEmbedLink = (url) => {
    const urlObj = new URL(url);
    if (
      urlObj.hostname === "www.youtube.com" &&
      urlObj.pathname === "/embed"
    ) {
      return url;
    } else if (
      urlObj.hostname === "www.youtube.com" &&
      urlObj.pathname === "/watch"
    ) {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&&mute=1`;
      }
    }
    return url;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //Corregir flechas
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    beforeChange: (oldIndex, newIndex) => {
      if (videoRefs.current[oldIndex]) {
        videoRefs.current[oldIndex].contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    },
    afterChange: (index) => {
      setActiveSlide(index);
    },
  };

  // Función para aleatorizar un arreglo
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  };

  return (
    <section className={styles.destacado}>
      <p className={styles.destacados}>DESTACADOS:</p>
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={video.id}>
            <div className={styles.descripcionVideo}>
              <div className={styles.tituloContainer}>
                <Titulo color="#00aac1">
                  <h1>{video.categoria}</h1>
                </Titulo>
              </div>
              <h2 className={styles.tituloVideo}>{video.titulo}</h2>
              <p>{video.descripcion}</p>
            </div>
            <div className={styles.videoDestacado}>
              {activeSlide === index && (
                <iframe
                  ref={(el) => (videoRefs.current[index] = el)}
                  width="100%"
                  height="100%"
                  src={convertToEmbedLink(video.link)}
                  title={video.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Destacado;

