"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import style from "@/styles/Background.module.css";

const Background = () => {
  const [backgroundUrl, setBackgroundUrl] = useState("");

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const res = await fetch("https://stickeando.onrender.com/api/backgrounds/selected");
        const data = await res.json();
        if (data && data.image_url) {
          setBackgroundUrl(`https://stickeando.onrender.com${data.image_url}`);
        }
      } catch (error) {
        console.error("Error fetching background:", error);
      }
    };
    fetchBackground();
  }, []);

  return (
    <div className={style.containerBackground}>
      {backgroundUrl ? (
        <Image
          className={style.background}
          alt="Background picture"
          src={backgroundUrl}
          width={1920}
          height={1080}
          unoptimized
        />
      ) : (
        <p>.</p>
      )}
      <h1 className={style.tittle}>Stickeando</h1>
      <h4 className={style.subtittle}>stickers vinílicos resistentes al agua</h4>
    </div>
  );
};

export default Background;
