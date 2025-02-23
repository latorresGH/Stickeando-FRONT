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
          <Link href="/products?category=1">
            <div className={style.categoriaSeccionImage1}>
              <Image
                src="/images/CategoriaSimpsons.png"
                alt="Imagen categoria los Simpsons"
                className="categoriaImagenSeccion1"
                width={300}
                height={300}
              />
            </div>
          </Link>
          <p>Los Simpsons</p>
        </div>

        <div className={style.categoriaSeccion}>
          <Link href="/products?category=2">
            <div className={style.categoriaSeccionImage2}>
              <Image
                src="/images/CategoriaAnimados.png"
                alt="Imagen categoria animados"
                className="categoriaImagenSeccion2"
                width={300}
                height={300}
              />
            </div>
          </Link>
          <p>Animados</p>
        </div>

        <div className={style.categoriaSeccion}>
          <Link href="/products?category=3">
            <div className={style.categoriaSeccionImage3}>
              <Image
                src="/images/CategoriaArgentinos.png"
                alt="Imagen categoria Argentinos"
                className="categoriaImagenSeccion3"
                width={300}
                height={300}
              />
            </div>
          </Link>
          <p>Argentinos</p>
        </div>

        <div className={style.categoriaSeccion}>
          <Link href="/products?category=4">
            <div className={style.categoriaSeccionImage4}>
              <Image
                src="/images/CategoriaSignos.png"
                alt="Imagen categoria de Signos"
                className="categoriaImagenSeccion4"
                width={300}
                height={300}
              />
            </div>
          </Link>
          <p>Signos</p>
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
