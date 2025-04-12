"use client"
import ProductCatalog from "@/components/ProductCatalog";
import HeaderTwo from "@/components/HeaderTwo";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function Products () {
  return (
    <div>
      <HeaderTwo></HeaderTwo>
      <Suspense fallback={<p>Cargando productos...Esto puede llegar a demorar hasta 50s si el servidor estaba inactivo..</p>}>
        <ProductCatalog />
      </Suspense>
      <Footer></Footer>
    </div>
  );
}