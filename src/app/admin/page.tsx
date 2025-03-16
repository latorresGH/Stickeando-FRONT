import HeaderAdmin from "@/components/HeaderAdmin"
import style from '@/styles/AdminPage.module.css'

export default function Admin() {
    return (
        <div className={style.contenedorPage}>
            <div>
                <HeaderAdmin></HeaderAdmin>
            </div>
            <div className={style.headerStickers}>
                    Administrador
                </div>
            <div className={style.panelDerecho}>
                <h1>Bienvenido admin</h1>
            </div>
        </div>
    )
}