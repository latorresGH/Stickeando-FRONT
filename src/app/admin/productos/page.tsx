import AdminPanel from "@/components/AdminPanel"
import HeaderAdmin from "@/components/HeaderAdmin"
import DeleteProduct from "@/components/DeleteProduct"
import style from '@/styles/AdminPage.module.css'
import AdminBackground from "@/components/AdminBackground"

export default function Productos() {
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