"use client";
import style from "@/styles/Background.module.css";
import { handleScrollDown } from "@/hook/scrollDown";
import Image from "next/image";

const Background = () => {
  return (
    <div className={style.containerBackground}>
      <Image
        className={style.background}
        alt="Background picture"
        src="/images/Background.jpg"
        width={1920}
        height={1080}
      ></Image>

      <h1 className={style.tittle}>Stickeando</h1>
      <h4 className={style.subtittle}>stickers vinílicos resistentes al agua</h4>

      <div className={style.arrowContainer} onClick={handleScrollDown}>
        <Image
          className={style.arrowIcon}
          alt="Arrow Down"
          src="/svgs/arrow-down.svg"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default Background;
