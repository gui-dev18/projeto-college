import { Link, Outlet } from 'react-router-dom'

const ClienteLayout = () => {
  return (
    <>
      <nav aria-label="Navegação do cliente">
        <Link to="/">Cardápio</Link>{' '}
        <Link to="/carrinho">Carrinho</Link>{' '}
        <Link to="/finalizar">Finalizar pedido</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default ClienteLayout
