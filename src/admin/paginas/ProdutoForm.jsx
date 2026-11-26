import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDadosLoja } from '../../contexto/useDadosLoja.js'

const ProdutoForm = () => {
  const [erro, setErro] = useState('')
  const { id } = useParams()
  const navegar = useNavigate()
  const { dados, salvarProduto } = useDadosLoja()
  const produto = dados.produtos.find((item) => item.id === id)
  const categoriasOrdenadas = [...dados.categorias].sort(
    (a, b) => a.ordem - b.ordem,
  )

  const salvar = (evento) => {
    evento.preventDefault()
    const campos = new FormData(evento.currentTarget)
    const nome = campos.get('nome').trim()
    const descricao = campos.get('descricao').trim()
    const preco = Number(campos.get('preco'))
    const categoriaId = campos.get('categoriaId')
    const fotoUrl = campos.get('fotoUrl').trim()

    if (
      !nome ||
      !descricao ||
      !categoriaId ||
      !Number.isFinite(preco) ||
      preco <= 0
    ) {
      setErro('Preencha os campos obrigatórios com valores válidos.')
      return
    }

    setErro('')
    salvarProduto({
      id: produto?.id ?? String(Date.now()),
      nome,
      descricao,
      preco,
      fotoUrl,
      categoriaId,
      disponivel: campos.get('disponivel') === 'on',
    })
    navegar('/admin/produtos')
  }

  if (id && !produto) {
    return (
      <main className="pagina-admin">
        <h1>Produto não encontrado</h1>
        <Link to="/admin/produtos">Voltar para produtos</Link>
      </main>
    )
  }

  return (
    <main className="pagina-admin">
      <h1>{produto ? 'Editar produto' : 'Novo produto'}</h1>
      {categoriasOrdenadas.length === 0 ? (
        <p>
          Cadastre uma categoria antes de criar um produto.{' '}
          <Link to="/admin/categorias">Gerenciar categorias</Link>
        </p>
      ) : (
        <form className="formulario-admin" onSubmit={salvar}>
          {erro && <p className="mensagem-admin" role="alert">{erro}</p>}
          <label>
            Nome
            <input name="nome" defaultValue={produto?.nome ?? ''} required />
          </label>
          <label>
            Descrição
            <textarea
              name="descricao"
              defaultValue={produto?.descricao ?? ''}
              required
            />
          </label>
          <label>
            Preço
            <input
              name="preco"
              type="number"
              min="0.01"
              step="0.01"
              defaultValue={produto?.preco ?? ''}
              required
            />
          </label>
          <label>
            URL da foto
            <input
              name="fotoUrl"
              type="url"
              defaultValue={produto?.fotoUrl ?? ''}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </label>
          <label>
            Categoria
            <select
              name="categoriaId"
              defaultValue={produto?.categoriaId ?? ''}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categoriasOrdenadas.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </label>
          <label className="campo-checkbox">
            <input
              name="disponivel"
              type="checkbox"
              defaultChecked={produto?.disponivel ?? true}
            />
            Disponível
          </label>
          <button type="submit">Salvar produto</button>
        </form>
      )}
    </main>
  )
}

export default ProdutoForm
