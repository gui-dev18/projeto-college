import { Route, Routes } from 'react-router-dom'
import ClienteLayout from './cliente/layouts/ClienteLayout.jsx'
import Cardapio from './cliente/paginas/Cardapio.jsx'
import DetalheProduto from './cliente/paginas/DetalheProduto.jsx'
import Carrinho from './cliente/paginas/Carrinho.jsx'
import FinalizarPedido from './cliente/paginas/FinalizarPedido.jsx'
import AdminLayout from './admin/layouts/AdminLayout.jsx'
import Dashboard from './admin/paginas/Dashboard.jsx'
import Produtos from './admin/paginas/Produtos.jsx'
import ProdutoForm from './admin/paginas/ProdutoForm.jsx'
import Categorias from './admin/paginas/Categorias.jsx'
import Configuracoes from './admin/paginas/Configuracoes.jsx'
import { DadosLojaProvider } from './contexto/DadosLojaContext.jsx'

const App = () => {
  return (
    <DadosLojaProvider>
      <Routes>
        <Route element={<ClienteLayout />}>
          <Route index element={<Cardapio />} />
          <Route path="cardapio" element={<Cardapio />} />
          <Route path="produto/:id" element={<DetalheProduto />} />
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="finalizar" element={<FinalizarPedido />} />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="produtos/novo" element={<ProdutoForm />} />
          <Route path="produtos/:id/editar" element={<ProdutoForm />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </DadosLojaProvider>
  )
}

export default App
