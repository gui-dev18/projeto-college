import { useState } from 'react'
import { useDadosLoja } from '../../contexto/useDadosLoja.js'

const Configuracoes = () => {
  const [erro, setErro] = useState('')
  const { dados, salvarConfiguracoes } = useDadosLoja()

  const salvar = (evento) => {
    evento.preventDefault()
    const campos = new FormData(evento.currentTarget)
    const nomeLoja = campos.get('nomeLoja').trim()
    const whatsapp = campos.get('whatsapp').trim()
    const logoUrl = campos.get('logoUrl').trim()

    if (!nomeLoja || !/^\d{10,13}$/.test(whatsapp)) {
      setErro('Informe o nome da loja e um WhatsApp com DDD usando apenas números.')
      return
    }

    setErro('')
    salvarConfiguracoes({ nomeLoja, whatsapp, logoUrl })
  }

  return (
    <main className="pagina-admin">
      <h1>Configurações</h1>
      <form className="formulario-admin" onSubmit={salvar}>
        {erro && <p className="mensagem-admin" role="alert">{erro}</p>}
        <label>
          Nome da loja
          <input
            name="nomeLoja"
            defaultValue={dados.configuracoes.nomeLoja}
            required
          />
        </label>
        <label>
          Número do WhatsApp (com DDD)
          <input
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10,13}"
            minLength="10"
            maxLength="13"
            placeholder="5585999999999"
            defaultValue={dados.configuracoes.whatsapp ?? ''}
            required
          />
        </label>
        <label>
          URL da logo
          <input
            name="logoUrl"
            type="url"
            placeholder="https://exemplo.com/logo.png"
            defaultValue={dados.configuracoes.logoUrl ?? ''}
          />
        </label>
        <button type="submit">Salvar configurações</button>
      </form>
    </main>
  )
}

export default Configuracoes
