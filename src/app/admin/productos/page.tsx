"use client"
import { useUser } from "@/context/authContext";
import { useRouter } from "next/navigation"; // Cambiar a next/navigation
import { useEffect, useState } from "react";
import AdminPanel from "@/components/AdminPanel"
import HeaderAdmin from "@/components/HeaderAdmin"
import DeleteProduct from "@/components/DeleteProduct"
import style from '@/styles/AdminPage.module.css'
import AdminBackground from "@/components/AdminBackground"

export default function Productos() {
  const { user } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // Estado para saber si estamos en el cliente

  useEffect(() => {
    setIsClient(true); // Cambia el estado cuando se monta el componente en el cliente
  }, []);

  useEffect(() => {
    // Verificar si el usuario está autenticado y si tiene el rol de 'administrador'
    if (isClient && (!user || user.rol !== 'administrador')) {
      // Si no es admin, redirigir a la página de no autorizado
      router.push('/home');
    }
  }, [user, router, isClient]);

  if (!isClient) {
    return null; // Evita renderizar el componente hasta que esté montado en el cliente
  }

    return (
        <div className={style.contenedorPage}>
            <div>
                <HeaderAdmin></HeaderAdmin>
            </div>
            <div className={style.headerStickers}>
                    Administrador stickers
                </div>
            <div className={style.panelDerecho}>
                <AdminPanel></AdminPanel>
                <DeleteProduct></DeleteProduct>
            </div>
            
            <div className={style.panelDerecho}>
                <AdminBackground></AdminBackground>
            </div>


        </div>
    )
}