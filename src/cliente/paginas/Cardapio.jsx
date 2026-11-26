import { Link } from 'react-router-dom'
import { useDadosLoja } from '../../contexto/useDadosLoja.js'

const Cardapio = () => {
  const { dados, adicionarAoCarrinho } = useDadosLoja()

  return (
    <main>
      <h1>Cardápio</h1>
      {dados.produtos.length === 0 ? (
        <p>Nenhum produto disponível no momento.</p>
      ) : (
        <ul>
          {dados.produtos.map((produto) => (
            <li key={produto.id}>
              <h2>
                <Link to={`/produto/${produto.id}`}>{produto.nome}</Link>
              </h2>
              <p>{produto.descricao}</p>
              <p>
                {produto.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <button
                type="button"
                onClick={() => adicionarAoCarrinho(produto.id)}
              >
                Adicionar ao carrinho
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Cardapio
