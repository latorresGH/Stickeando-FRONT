import CategoryManager from "@/components/CategoryManager"
import HeaderAdmin from "@/components/HeaderAdmin"
import style from '@/styles/AdminPage.module.css'

export default function () {
    return (
        <div className={style.contenedorPage}>
            <div>
                <HeaderAdmin></HeaderAdmin>
            </div>
            <div className={style.headerStickers}>
                    Administrador categorias
                </div>
            <div className={style.panelDerecho}>
                <CategoryManager></CategoryManager>
            </div>
        </div>
    )
}