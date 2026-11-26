import { useDadosLoja } from '../../contexto/useDadosLoja.js'

const Dashboard = () => {
  const { dados } = useDadosLoja()
  const produtosAtivos = dados.produtos.filter(
    (produto) => produto.disponivel !== false,
  ).length

  return (
    <main className="pagina-admin">
      <h1>Dashboard</h1>
      <section className="cartoes-dashboard" aria-label="Resumo da loja">
        <article className="cartao-dashboard">
          <p>Total de produtos</p>
          <strong>{dados.produtos.length}</strong>
        </article>
        <article className="cartao-dashboard">
          <p>Produtos ativos</p>
          <strong>{produtosAtivos}</strong>
        </article>
        <article className="cartao-dashboard">
          <p>Total de categorias</p>
          <strong>{dados.categorias.length}</strong>
        </article>
      </section>
    </main>
  )
}

export default Dashboard
