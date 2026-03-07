const STORAGE_KEY = 'indiene_contribuicoes'

export interface ContribuicaoJogo {
  valorExtra: number
  apoiadoresExtra: number
}

function load (): Record<string, ContribuicaoJogo> {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, ContribuicaoJogo>
        return typeof parsed === 'object' && parsed !== null ? parsed : {}
      }
    } catch {
      // ignore
    }
  }
  return {}
}

function save (data: Record<string, ContribuicaoJogo>) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function useContribuicoes () {
  const data = ref<Record<string, ContribuicaoJogo>>(load())

  function persist () {
    save(data.value)
  }

  function getExtra (jogoId: string): ContribuicaoJogo {
    return data.value[jogoId] ?? { valorExtra: 0, apoiadoresExtra: 0 }
  }

  function addContribuicao (jogoId: string, valor: number): void {
    if (valor <= 0) return
    const current = data.value[jogoId] ?? { valorExtra: 0, apoiadoresExtra: 0 }
    data.value[jogoId] = {
      valorExtra: current.valorExtra + valor,
      apoiadoresExtra: current.apoiadoresExtra + 1
    }
    persist()
  }

  return {
    getExtra,
    addContribuicao
  }
}
