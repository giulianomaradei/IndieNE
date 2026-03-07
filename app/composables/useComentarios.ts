export interface Comentario {
  usuario: string
  texto: string
  avatar: string
  likes: number
  dislikes: number
}

const STORAGE_KEY = 'indiene_comentarios'

function getAvatarUrl (usuario: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(usuario)}`
}

function load (): Record<string, Record<number, Comentario[]>> {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, Record<string, Comentario[]>>
        const out: Record<string, Record<number, Comentario[]>> = {}
        for (const jogoId of Object.keys(parsed)) {
          out[jogoId] = {}
          for (const idxStr of Object.keys(parsed[jogoId] || {})) {
            const arr = (parsed[jogoId] as Record<string, Comentario[]>)[idxStr] || []
            out[jogoId][Number(idxStr)] = arr.map(c => ({
              ...c,
              avatar: c.avatar || getAvatarUrl(c.usuario)
            }))
          }
        }
        return out
      }
    } catch {
      // ignore
    }
  }
  return {}
}

function save (data: Record<string, Record<number, Comentario[]>>) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function useComentarios () {
  const data = ref<Record<string, Record<number, Comentario[]>>>(load())

  function persist () {
    save(data.value)
  }

  function getComentarios (jogoId: string, atualizacaoIdx: number): Comentario[] {
    return data.value[jogoId]?.[atualizacaoIdx] ?? []
  }

  function addComentario (jogoId: string, atualizacaoIdx: number, usuario: string, texto: string) {
    const trimmedUser = usuario.trim() || 'Anônimo'
    const trimmedText = texto.trim()
    if (!trimmedText) return

    if (!data.value[jogoId]) data.value[jogoId] = {}
    if (!data.value[jogoId][atualizacaoIdx]) data.value[jogoId][atualizacaoIdx] = []

    data.value[jogoId][atualizacaoIdx].push({
      usuario: trimmedUser,
      texto: trimmedText,
      avatar: getAvatarUrl(trimmedUser),
      likes: 0,
      dislikes: 0
    })
    persist()
  }

  return {
    getComentarios,
    addComentario,
    getAvatarUrl
  }
}
