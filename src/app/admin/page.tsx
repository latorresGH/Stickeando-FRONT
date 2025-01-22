import AdminPanel from "@/components/AdminPanel"
import CategoryManager from "@/components/CategoryManager"
import HeaderAdmin from "@/components/HeaderAdmin"

export default function () {
    return (
        <div>
            <div>
                <HeaderAdmin></HeaderAdmin>
            </div>
            <div>
                <h1>Productos</h1>
                <AdminPanel></AdminPanel>
                <h2>Categorias</h2>
                <CategoryManager></CategoryManager>
            </div>
        </div>
    )
}