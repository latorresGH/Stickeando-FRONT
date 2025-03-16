"use client"
import ProductCatalog from "@/components/ProductCatalog";
import HeaderTwo from "@/components/HeaderTwo";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function Products () {
  return (
    <div>
      <HeaderTwo></HeaderTwo>
      <Suspense fallback={<p>Cargando productos...</p>}>
        <ProductCatalog />
      </Suspense>
      <Footer></Footer>
    </div>
  );
}