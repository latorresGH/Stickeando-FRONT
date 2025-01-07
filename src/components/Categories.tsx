"use client";
import style from "@/styles/Categories.module.css";
import Image from "next/image";

const Categories = () => {
  return (
    <div className={style.categoriesContainer}>
        <div className={style.textCategories}>
            <h2>Categorias</h2>
            <span>estos son solo algunos tipos de stickers, no todos</span>
        </div>

      <div className={style.categories}>
        <div className={style.categoriaSeccion}>
            <Image
            src="/images/CategoriaSimpsons.png"
            alt="Imagen categoria los Simpsons"
            className="categoriaImagenSeccion1"
            width={300}
            height={300}
            />
            <p>Los Simpsons</p>
        </div>

        <div className={style.categoriaSeccion}>
            <Image
            src="/images/CategoriaAnimados.png"
            alt="Imagen categoria animados"
            className="categoriaImagenSeccion2"
            width={300}
            height={300}
            />
            <p>Animados</p>
        </div>

        <div className={style.categoriaSeccion}>
            <Image
            src="/images/CategoriaArgentinos.png"
            alt="Imagen categoria Argentinos"
            className="categoriaImagenSeccion3"
            width={300}
            height={300}
            />
            <p>Argentinos</p>
        </div>

        <div className={style.categoriaSeccion}>
            <Image
            src="/images/CategoriaSignos.png"
            alt="Imagen categoria de Signos"
            className="categoriaImagenSeccion4"
            width={300}
            height={300}
            />
            <p>Signos</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
