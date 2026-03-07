const STORAGE_KEY = 'indiene_comentario_reacoes'

type Reacao = 'like' | 'dislike'

// key: "jogoId:atualizacaoIdx:commentIndex" -> Record<userEmail, Reacao>
function load (): Record<string, Record<string, Reacao>> {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      // ignore
    }
  }
  return {}
}

function save (data: Record<string, Record<string, Reacao>>) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

function key (jogoId: string, atualizacaoIdx: number, commentIndex: number) {
  return `${jogoId}:${atualizacaoIdx}:${commentIndex}`
}

export function useComentarioReacoes () {
  const data = ref<Record<string, Record<string, Reacao>>>(load())

  function persist () {
    save(data.value)
  }

  function getTotais (jogoId: string, atualizacaoIdx: number, commentIndex: number): { likes: number; dislikes: number } {
    const k = key(jogoId, atualizacaoIdx, commentIndex)
    const reacoes = data.value[k]
    if (!reacoes) return { likes: 0, dislikes: 0 }
    let likes = 0
    let dislikes = 0
    for (const r of Object.values(reacoes)) {
      if (r === 'like') likes++
      else dislikes++
    }
    return { likes, dislikes }
  }

  function getMinhaReacao (jogoId: string, atualizacaoIdx: number, commentIndex: number): Reacao | null {
    const { user } = useAuth()
    const email = user.value?.email
    if (!email) return null
    const k = key(jogoId, atualizacaoIdx, commentIndex)
    return data.value[k]?.[email] ?? null
  }

  function setReacao (jogoId: string, atualizacaoIdx: number, commentIndex: number, tipo: Reacao) {
    const { user } = useAuth()
    const email = user.value?.email
    if (!email) return
    const k = key(jogoId, atualizacaoIdx, commentIndex)
    if (!data.value[k]) data.value[k] = {}
    const current = data.value[k][email]
    if (current === tipo) {
      delete data.value[k][email]
    } else {
      data.value[k][email] = tipo
    }
    persist()
  }

  return {
    getTotais,
    getMinhaReacao,
    setReacao
  }
}
