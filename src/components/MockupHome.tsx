import styles from "@/styles/MockupHome.module.css";
import Image from "next/image";

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
    </div>
  );
};

export default MockupHome;
