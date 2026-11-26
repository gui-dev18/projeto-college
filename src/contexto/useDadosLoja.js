import { useContext } from 'react'
import { DadosLojaContext } from './dadosLoja.js'

export const useDadosLoja = () => {
  const contexto = useContext(DadosLojaContext)

  if (contexto === undefined) {
    throw new Error('useDadosLoja deve ser usado dentro de DadosLojaProvider.')
  }

  return contexto
}
