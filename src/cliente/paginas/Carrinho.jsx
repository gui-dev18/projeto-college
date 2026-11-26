import { useDadosLoja } from '../../contexto/useDadosLoja.js'

const Carrinho = () => {
  const { dados, removerDoCarrinho } = useDadosLoja()
  const itens = dados.carrinho
    .map((item) => ({
      ...item,
      produto: dados.produtos.find((produto) => produto.id === item.produtoId),
    }))
    .filter((item) => item.produto)

  const total = itens.reduce(
    (soma, item) => soma + item.produto.preco * item.quantidade,
    0,
  )

  return (
    <main>
      <h1>Carrinho</h1>
      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {itens.map((item) => (
              <li key={item.produtoId}>
                {item.produto.nome} — {item.quantidade} ×{' '}
                {item.produto.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
                <button
                  type="button"
                  onClick={() => removerDoCarrinho(item.produtoId)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <p>
            Total:{' '}
            {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </>
      )}
    </main>
  )
}

export default Carrinho
