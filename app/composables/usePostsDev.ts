import type { Atualizacao } from '~/data/jogo-detalhes'

const STORAGE_KEY = 'indiene_posts_dev'

function load (): Record<string, Atualizacao[]> {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, Atualizacao[]>
        return typeof parsed === 'object' && parsed !== null ? parsed : {}
      }
    } catch {
      // ignore
    }
  }
  return {}
}

function save (data: Record<string, Atualizacao[]>) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function usePostsDev () {
  const data = ref<Record<string, Atualizacao[]>>(load())

  function persist () {
    save(data.value)
  }

  function getPosts (jogoId: string): Atualizacao[] {
    return data.value[jogoId] ?? []
  }

  function addPost (jogoId: string, post: Omit<Atualizacao, 'comentarios'>): void {
    const list = data.value[jogoId] ?? []
    data.value[jogoId] = [
      { ...post, comentarios: [] },
      ...list
    ]
    persist()
  }

  return {
    getPosts,
    addPost
  }
}
