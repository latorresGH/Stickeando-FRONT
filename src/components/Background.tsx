"use client";
import style from "@/styles/Background.module.css";
import { handleScrollDown } from "@/hook/scrollDown";

const Background = () => {
  return (
    <div className={style.containerBackground}>
      <img
        className={style.background}
        alt="Background picture"
        src="/images/Background.jpg"
      ></img>

      <h1 className={style.tittle}>Stickeando</h1>
      <h4 className={style.subtittle}>stickers vinílicos resistentes al agua</h4>

      <div className={style.arrowContainer} onClick={handleScrollDown}>
        <img
          className={style.arrowIcon}
          alt="Arrow Down"
          src="/svgs/arrow-down.svg"
        />
      </div>
    </div>
  );
};

export default Background;
