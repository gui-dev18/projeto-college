import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDadosLoja } from '../../contexto/useDadosLoja.js'

const Produtos = () => {
  const { dados, excluirProduto } = useDadosLoja()
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const produtosFiltrados = dados.produtos.filter(
    (produto) => !categoriaFiltro || produto.categoriaId === categoriaFiltro,
  )

  return (
    <main className="pagina-admin">
      <div className="cabecalho-admin">
        <h1>Produtos</h1>
        <Link className="link-botao" to="/admin/produtos/novo">
          Cadastrar produto
        </Link>
      </div>
      <label>
        Filtrar por categoria
        <select
          className="filtro-admin"
          value={categoriaFiltro}
          onChange={(evento) => setCategoriaFiltro(evento.target.value)}
        >
          <option value="">Todas as categorias</option>
          {dados.categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </label>
      {produtosFiltrados.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className="tabela-admin">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Disponibilidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto) => {
              const categoria = dados.categorias.find(
                (item) => item.id === produto.categoriaId,
              )

              return (
                <tr key={produto.id}>
                  <td>
                    {produto.fotoUrl && (
                      <img
                        className="imagem-produto-admin"
                        src={produto.fotoUrl}
                        alt=""
                      />
                    )}{' '}
                    {produto.nome}
                  </td>
                  <td>{categoria?.nome ?? 'Sem categoria'}</td>
                  <td>
                    {produto.preco.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td>{produto.disponivel === false ? 'Indisponível' : 'Ativo'}</td>
                  <td>
                    <Link to={`/admin/produtos/${produto.id}/editar`}>
                      Editar
                    </Link>{' '}
                    <button
                      className="botao-perigo"
                      type="button"
                      onClick={() => excluirProduto(produto.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </main>
  )
}

export default Produtos
