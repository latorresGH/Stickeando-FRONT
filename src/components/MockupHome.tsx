import styles from "@/styles/MockupHome.module.css";
import Image from "next/image";
import Link from "next/link";

const MockupHome = () => {
  return (
    <div className={styles.baseMockup}>
      <div className={styles.container}>
        <Image
          className={styles.mockup}
          src="/images/mockup2.jpg"
          alt="Mockup of the home page"
          width={1440}
          height={1024}
        />

        <h1 className={styles.texto}>stickeando</h1>
        <p className={styles.segundoTexto}>
          Encontrá tus <span className={styles.span}>stickers</span> en
        </p>
      </div>

      <div className={styles.redesContainer}>
        <div className={styles.redesBox1}>
 
          <Link
            href="https://www.instagram.com/stic.keando/"
            className={styles.boton}
          >
          <span className={styles.textoBox1}>Instagram</span>
          </Link>
        </div>

        <div className={styles.redesBox2}>

          <Link
            href="https://wa.me/5493425824554"
            className={styles.boton2}
          >
          <span className={styles.textoBox2}>Contactanos</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MockupHome;
