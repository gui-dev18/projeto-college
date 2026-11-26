import { Link, Outlet } from 'react-router-dom'
import '../admin.css'

const AdminLayout= () => {
  return (
    <>
      <nav className="navegacao-admin" aria-label="Navegação administrativa">
        <Link to="/admin">Dashboard</Link>{' '}
        <Link to="/admin/produtos">Produtos</Link>{' '}
        <Link to="/admin/categorias">Categorias</Link>{' '}
        <Link to="/admin/configuracoes">Configurações</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default AdminLayout
