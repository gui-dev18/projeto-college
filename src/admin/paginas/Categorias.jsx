import { useState } from 'react'
import { useDadosLoja } from '../../contexto/useDadosLoja.js'

const Categorias = () => {
  const { dados, salvarCategoria, excluirCategoria } = useDadosLoja()
  const [categoriaEditada, setCategoriaEditada] = useState(null)
  const [erro, setErro] = useState('')
  const categoriasOrdenadas = [...dados.categorias].sort(
    (a, b) => a.ordem - b.ordem,
  )

  const salvar = (evento) => {
    evento.preventDefault()
    const eraEdicao = Boolean(categoriaEditada)
    const campos = new FormData(evento.currentTarget)
    const nome = campos.get('nome').trim()
    const ordem = Number(campos.get('ordem'))

    if (!nome || !Number.isInteger(ordem) || ordem < 1) {
      setErro('Informe um nome e uma ordem de exibição válida.')
      return
    }

    salvarCategoria({
      id: categoriaEditada?.id ?? String(Date.now()),
      nome,
      ordem,
    })
    if (!eraEdicao) {
      evento.currentTarget.reset()
    }
    setCategoriaEditada(null)
    setErro('')
  }

  const editar = (categoria) => {
    setCategoriaEditada(categoria)
    setErro('')
  }

  const remover = (categoriaId) => {
    excluirCategoria(categoriaId)
    if (categoriaEditada?.id === categoriaId) {
      setCategoriaEditada(null)
    }
  }

  return (
    <main className="pagina-admin">
      <h1>Gerenciar categorias</h1>
      <form
        className="formulario-admin"
        key={categoriaEditada?.id ?? 'nova-categoria'}
        onSubmit={salvar}
      >
        <label>
          Nome da categoria
          <input
            name="nome"
            defaultValue={categoriaEditada?.nome ?? ''}
            required
          />
        </label>
        <label>
          Ordem de exibição
          <input
            name="ordem"
            type="number"
            min="1"
            step="1"
            defaultValue={categoriaEditada?.ordem ?? dados.categorias.length + 1}
            required
          />
        </label>
        {erro && <p className="mensagem-admin">{erro}</p>}
        <div className="acoes-admin">
          <button type="submit">
            {categoriaEditada ? 'Salvar alterações' : 'Criar categoria'}
          </button>
          {categoriaEditada && (
            <button type="button" onClick={() => setCategoriaEditada(null)}>
              Cancelar edição
            </button>
          )}
        </div>
      </form>
      {dados.categorias.length === 0 ? (
        <p>Nenhuma categoria cadastrada.</p>
      ) : (
        <table className="tabela-admin">
          <thead>
            <tr>
              <th>Ordem</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categoriasOrdenadas.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.ordem}</td>
                <td>{categoria.nome}</td>
                <td>
                  <button type="button" onClick={() => editar(categoria)}>
                    Editar
                  </button>{' '}
                  <button
                    className="botao-perigo"
                    type="button"
                    onClick={() => remover(categoria.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}

export default Categorias
