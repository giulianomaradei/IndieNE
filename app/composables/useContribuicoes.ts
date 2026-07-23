import type { ContribuicaoJogo } from '~/types/contribuicao.interface'
import type { CampanhaResumo } from '~/types/doacao.interface'
import { useDoacaoService } from '~/services/doacao.service'

export function useContribuicoes () {
  const data = useState<Record<string, ContribuicaoJogo>>('contribuicoes-sessao', () => ({}))
  const resumos = useState<Record<string, CampanhaResumo>>('resumos-campanhas-api', () => ({}))
  const doacaoService = useDoacaoService()

  function getExtra (jogoId: string): ContribuicaoJogo {
    return data.value[jogoId] ?? { valorExtra: 0, apoiadoresExtra: 0 }
  }

  async function carregarResumo (jogoId: string): Promise<CampanhaResumo> {
    const id = Number(jogoId)
    if (!Number.isInteger(id) || id <= 0) throw new Error('Jogo inválido.')
    const resumo = await doacaoService.buscarResumo(id)
    resumos.value[jogoId] = resumo
    return resumo
  }

  async function addContribuicao (jogoId: string, valor: number): Promise<void> {
    const id = Number(jogoId)
    if (!Number.isInteger(id) || id <= 0) throw new Error('Jogo inválido.')
    if (valor <= 0) throw new Error('Informe um valor maior que zero.')
    await doacaoService.criar({ jogoId: id, valor })
    const atual = getExtra(jogoId)
    data.value[jogoId] = {
      valorExtra: atual.valorExtra + valor,
      apoiadoresExtra: atual.apoiadoresExtra + 1
    }
    await carregarResumo(jogoId)
  }

  function getResumo (jogoId: string): CampanhaResumo | undefined {
    return resumos.value[jogoId]
  }

  return { getExtra, getResumo, carregarResumo, addContribuicao }
}
