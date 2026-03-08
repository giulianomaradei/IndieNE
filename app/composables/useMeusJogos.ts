import type { JogoDev } from '~/types/jogo-dev'
import { jogoDevVazio } from '~/types/jogo-dev'

const STORAGE_KEY = 'indiene_meus_jogos'

const mocks: JogoDev[] = [
  {
    id: 'god-breakers',
    title: 'God Breakers',
    descricao: 'Assuma o controle de cada luta em um combate fluido e feroz enquanto conecta combos agressivos, cancela golpes e rouba poderes.',
    thumb: '/images/jogos/god-breakers.avif',
    fotos: [],
    genero: ['Roguelike', 'Ação', 'Multijogador', 'Cooperativo', 'Combate'],
    desenvolvedor: 'Supergiant Games',
    metaPercentual: 68,
    valorArrecadado: 'R$ 68.745',
    metaValor: 'R$ 100.000',
    apoiadores: 851,
    dias: 86,
    dataPostagem: '2024-01',
    dataConclusao: '2025-06',
    qtdeJogadores: '1-4',
    compatControle: true,
    so: ['Windows', 'Linux']
  },
  {
    id: 'ambrosia',
    title: 'Ambrosia',
    descricao: 'Um RPG de aventura com mundo aberto e narrativa profunda.',
    thumb: '/images/jogos/ambrosia.jpg',
    fotos: [],
    genero: ['RPG', 'Aventura'],
    desenvolvedor: 'Supergiant Games',
    metaPercentual: 42,
    valorArrecadado: 'R$ 12.400',
    metaValor: 'R$ 30.000',
    apoiadores: 120,
    dias: 45,
    dataPostagem: '2024-05',
    dataConclusao: '',
    qtdeJogadores: '1',
    compatControle: true,
    so: ['Windows']
  }
]

function load (): JogoDev[] {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as JogoDev[]
        return Array.isArray(parsed) ? parsed : mocks
      }
    } catch {
      // ignore
    }
  }
  return [...mocks]
}

function save (list: JogoDev[]) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }
}

export function useMeusJogos () {
  const meusJogos = ref<JogoDev[]>(load())

  function persist () {
    save(meusJogos.value)
  }

  function addJogo (payload: Omit<JogoDev, 'id'>) {
    const id = payload.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'jogo-' + Date.now()
    const jogo: JogoDev = { ...payload, id }
    meusJogos.value.push(jogo)
    persist()
    return jogo
  }

  function updateJogo (id: string, payload: Partial<JogoDev>) {
    const idx = meusJogos.value.findIndex(j => j.id === id)
    if (idx === -1) return
    meusJogos.value[idx] = { ...meusJogos.value[idx]!, ...payload }
    persist()
  }

  function removeJogo (id: string) {
    meusJogos.value = meusJogos.value.filter(j => j.id !== id)
    persist()
  }

  function getJogoById (id: string): JogoDev | undefined {
    return meusJogos.value.find(j => j.id === id)
  }

  return {
    meusJogos,
    addJogo,
    updateJogo,
    removeJogo,
    getJogoById,
    jogoDevVazio
  }
}
