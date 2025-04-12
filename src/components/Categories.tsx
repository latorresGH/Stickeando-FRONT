"use client";
import style from "@/styles/Categories.module.css";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  return (
    <div className={style.categoriesContainer}>
      <div className={style.textCategories}>
        <h2>Categorias</h2>
        <span>Estos son solo algunos tipos de stickers, no todos</span>
      </div>

    <div className={style.imagenesContenedor}>
      <div className={style.categories}>
        <div className={style.categoriaSeccion}>
          <Link href="/products?category=28">
            <div className={style.categoriaSeccionImage1}>
              <Image
                src="/images/CategoriaEncendedores.png"
                alt="Imagen categoria los encendedores de la tienda"
                className="categoriaImagenSeccion1"
                width={300}
                height={300}
              />
            </div>
          </Link>
          <p>Encendedores</p>
        </div>

        <div className={style.categoriaSeccion}>
          <Link href="/products?category=11">
            <div className={style.categoriaSeccionImage2}>
              <Image
                
                src="/images/CategoriaArgentina.webp"
                alt="Imagen categoria stickers de Argentina"
                className="categoriaImagenSeccion2"
                width={300}
                height={300}
              />
            </div>
          </Link>
          <p>Argentina</p>
        </div>

        <div className={style.categoriaSeccion}>
          <Link href="/products?category=33">
            <div className={style.categoriaSeccionImage3}>
              <Image
                src="/images/CategoriaAnime.webp"
                alt="Imagen categoria stickers de Anime"
                className="categoriaImagenSeccion3"
                width={300}
                height={300}
              />
            </div>
          </Link>
          <p>Anime</p>
        </div>

        <div className={style.categoriaSeccion}>
          <Link href="/products?category=25">
            <div className={style.categoriaSeccionImage4}>
              <Image
                src="/images/CategoriaFlores.webp"
                alt="Imagen categoria de stickers de flores"
                className="categoriaImagenSeccion4"
                width={300}
                height={300}
              />
            </div>
          </Link>
          <p>Flores</p>
        </div>
      </div>
    </div>

      <div className={style.buttonSection}>
        <button className={style.button}>
          <Link href="/products">Todos los productos</Link>

          <Image
            className={style.image}
            src="/images/cursor.png"
            alt="Flecha"
            width={50}
            height={50}
          />
        </button>
      </div>
    </div>
  );
};

export default Categories;
