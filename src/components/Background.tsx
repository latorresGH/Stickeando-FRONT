"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import style from "@/styles/Background.module.css";

const Background = () => {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const res = await fetch("https://stickeando.onrender.com/api/backgrounds/selected");
        if (!res.ok) throw new Error("Error al obtener el background");

        const data = await res.json();
        if (data?.image_url) {
          setBackgroundUrl(data.image_url); // Cloudinary ya da URLs completas
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
