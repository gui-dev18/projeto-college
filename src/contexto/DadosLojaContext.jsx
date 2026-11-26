import { useEffect, useState } from 'react'
import { DadosLojaContext } from './dadosLoja.js'

const CHAVE_DADOS = 'pizzaria-dados'

const dadosIniciais = {
  produtos: [
    {
      id: 'pizza-marguerita',
      nome: 'Pizza Margherita',
      descricao: 'Molho de tomate, queijo e manjericão.',
      preco: 39.9,
      fotoUrl: '',
      categoriaId: 'pizzas',
      disponivel: true,
    },
    {
      id: 'pizza-calabresa',
      nome: 'Pizza Calabresa',
      descricao: 'Calabresa, cebola e queijo.',
      preco: 42.9,
      fotoUrl: '',
      categoriaId: 'pizzas',
      disponivel: true,
    },
  ],
  categorias: [
    { id: 'pizzas', nome: 'Pizzas', ordem: 1 },
    { id: 'bebidas', nome: 'Bebidas', ordem: 2 },
  ],
  configuracoes: { nomeLoja: 'Pizzaria', whatsapp: '', logoUrl: '' },
  carrinho: [],
}

const lerDadosSalvos = () => {
  const conteudo = localStorage.getItem(CHAVE_DADOS)

  if (conteudo === null) {
    return dadosIniciais
  }

  let dadosSalvos
  try {
    dadosSalvos = JSON.parse(conteudo)
  } catch (erro) {
    console.error('Não foi possível interpretar os dados salvos da loja.', erro)
    return dadosIniciais
  }

  if (dadosSalvos === null || typeof dadosSalvos !== 'object' || Array.isArray(dadosSalvos)) {
    console.error('Os dados salvos da loja têm um formato inválido.')
    return dadosIniciais
  }

  return {
    ...dadosIniciais,
    ...dadosSalvos,
    configuracoes:
      dadosSalvos.configuracoes &&
      typeof dadosSalvos.configuracoes === 'object' &&
      !Array.isArray(dadosSalvos.configuracoes)
        ? { ...dadosIniciais.configuracoes, ...dadosSalvos.configuracoes }
        : dadosIniciais.configuracoes,
    produtos: Array.isArray(dadosSalvos.produtos)
      ? dadosSalvos.produtos.map((produto) => ({
          ...produto,
          fotoUrl: produto.fotoUrl ?? '',
          disponivel: produto.disponivel ?? true,
        }))
      : dadosIniciais.produtos,
    categorias: Array.isArray(dadosSalvos.categorias)
      ? dadosSalvos.categorias.map((categoria, indice) => ({
          ...categoria,
          ordem: categoria.ordem ?? indice + 1,
        }))
      : dadosIniciais.categorias,
    carrinho: Array.isArray(dadosSalvos.carrinho)
      ? dadosSalvos.carrinho
      : dadosIniciais.carrinho,
  }
}

export const DadosLojaProvider = ({ children }) => {
  const [dados, setDados] = useState(lerDadosSalvos)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_DADOS, JSON.stringify(dados))
    } catch (erro) {
      console.error('Não foi possível salvar os dados da loja no Local Storage.', erro)
    }
  }, [dados])

  const salvarProduto = (produto) => {
    setDados((atuais) => {
      const produtoExiste = atuais.produtos.some((item) => item.id === produto.id)
      const produtos = produtoExiste
        ? atuais.produtos.map((item) => (item.id === produto.id ? produto : item))
        : [...atuais.produtos, produto]

      return { ...atuais, produtos }
    })
  }

  const salvarCategoria = (categoria) => {
    setDados((atuais) => {
      const categoriaExiste = atuais.categorias.some(
        (item) => item.id === categoria.id,
      )
      const categorias = categoriaExiste
        ? atuais.categorias.map((item) =>
            item.id === categoria.id ? categoria : item,
          )
        : [...atuais.categorias, categoria]

      return { ...atuais, categorias }
    })
  }

  const salvarConfiguracoes = (configuracoes) => {
    setDados((atuais) => ({
      ...atuais,
      configuracoes: { ...atuais.configuracoes, ...configuracoes },
    }))
  }

  const excluirProduto = (produtoId) => {
    setDados((atuais) => ({
      ...atuais,
      produtos: atuais.produtos.filter((produto) => produto.id !== produtoId),
      carrinho: atuais.carrinho.filter((item) => item.produtoId !== produtoId),
    }))
  }

  const excluirCategoria = (categoriaId) => {
    setDados((atuais) => ({
      ...atuais,
      categorias: atuais.categorias.filter(
        (categoria) => categoria.id !== categoriaId,
      ),
      produtos: atuais.produtos.map((produto) =>
        produto.categoriaId === categoriaId
          ? { ...produto, categoriaId: '' }
          : produto,
      ),
    }))
  }

  const adicionarAoCarrinho = (produtoId) => {
    setDados((atuais) => {
      const itemExiste = atuais.carrinho.some(
        (item) => item.produtoId === produtoId,
      )
      const carrinho = itemExiste
        ? atuais.carrinho.map((item) =>
            item.produtoId === produtoId
              ? { ...item, quantidade: item.quantidade + 1 }
              : item,
          )
        : [...atuais.carrinho, { produtoId, quantidade: 1 }]

      return { ...atuais, carrinho }
    })
  }

  const removerDoCarrinho = (produtoId) => {
    setDados((atuais) => ({
      ...atuais,
      carrinho: atuais.carrinho.filter((item) => item.produtoId !== produtoId),
    }))
  }

  return (
    <DadosLojaContext.Provider
      value={{
        dados,
        salvarProduto,
        salvarCategoria,
        salvarConfiguracoes,
        excluirProduto,
        excluirCategoria,
        adicionarAoCarrinho,
        removerDoCarrinho,
      }}
    >
      {children}
    </DadosLojaContext.Provider>
  )
}
