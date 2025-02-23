import Carrito from "@/components/Carrito";
import Header from "@/components/HeaderTercero";
import styles from "@/styles/CarritoPage.module.css";
import Footer from "@/components/Footer";

export default function CarritoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header/>
      </div>
      <Carrito />
    </div>
  );
}