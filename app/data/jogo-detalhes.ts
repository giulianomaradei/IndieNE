export interface ComentarioMock {
  usuario: string
  texto: string
  likes: number
  dislikes: number
}

export interface Atualizacao {
  titulo: string
  data: string
  descricao: string
  imagem?: string
  comentarios: ComentarioMock[]
}

export interface DetalhesJogo {
  descricao: string
  valorArrecadado: number
  apoiadores: number
  dias: number
  metaValor: number
  fotos: string[]
  atualizacoes: Atualizacao[]
}

const vazio: DetalhesJogo = {
  descricao: '',
  valorArrecadado: 0,
  apoiadores: 0,
  dias: 0,
  metaValor: 0,
  fotos: [],
  atualizacoes: []
}

/** Formata número como moeda para o layout (ex.: 68745 → "R$ 68.745") */
export function formatarMoeda (valor: number): string {
  if (valor <= 0) return 'R$ 0'
  return 'R$ ' + valor.toLocaleString('pt-BR')
}

const detalhesPorJogo: Record<string, DetalhesJogo> = {
  'god-breakers': {
    descricao: 'Assuma o controle de cada luta em um combate fluido e feroz enquanto conecta combos agressivos, cancela ataques e coordena sua equipe para criar a equipe perfeita e derrube criaturas brutas em vários mundos.',
    valorArrecadado: 68745,
    apoiadores: 851,
    dias: 86,
    metaValor: 100000,
    fotos: ['', '', '', '', '', '', '', '', ''],
    atualizacoes: [
      {
        titulo: 'Novas mecanicas de raid',
        data: '26/11 às 19h58',
        descricao: 'Novas mecanicas de raid foram adicionadas ao jogo, incluindo novas boss fights e novas mecânicas de combate.',
        imagem: 'https://thunderfulgames.com/wp-content/uploads/2025/08/GODBREAKERS_Co-op_Mini-boss_Fight_Gladitor-scaled.jpg',
        comentarios: [
          { usuario: '@japa_UDI', texto: 'Godbreakers já mostra um potencial enorme.', likes: 58, dislikes: 0 },
          { usuario: '@manoel_games', texto: 'Desde o trailer eu tava empolgado', likes: 0, dislikes: 0 }
        ]
      },
      {
        titulo: 'Novas skins',
        data: '2 meses atrás',
        descricao: 'Novas skins foram adicionadas ao jogo, incluindo novas skins para os personagens e novas mecânicas de combate.',
        imagem: 'https://image.api.playstation.com/vulcan/ap/rnd/202510/2410/994872858ee48fa0ea6e2e553fca8c72e98d346262e4199e.jpg?w=1920&thumb=false',
        comentarios: [
          { usuario: '@tadala_queue', texto: 'Muito hypado, já vó deixar na wishlist', likes: 83, dislikes: 0 }
        ]
      },
      {
        titulo: 'Nova classe: Scy Bat',
        data: '6 meses atrás',
        descricao: 'Nova classe: Scy Bat, uma classe que combina a velocidade e a agilidade de um morcego com a força e a resistência de um vampiro.',
        imagem: 'https://cdnb.artstation.com/p/assets/images/images/094/509/265/4k/anna-nilsson-scy-bat.webp?1765585802',
        comentarios: []
      }
    ]
  }
}

export function getDetalhesJogo (jogoId: string): DetalhesJogo {
  return detalhesPorJogo[jogoId] ?? { ...vazio }
}

/** Converte string do form "R$ 100.000" em número (para meta editável na área DEV). */
export function parseMetaValor (s: string | undefined): number {
  if (!s || s === '—') return 0
  const num = s.replace(/[R$\s.]/g, '').replace(',', '.')
  const n = Number(num)
  return Number.isFinite(n) ? n : 0
}

/** Base da campanha (valor + apoiadores) para somar com contribuições. Fonte única. */
export function getBaseCampanha (jogoId: string): { valorNumerico: number; apoiadores: number; metaNumerico: number } {
  const d = getDetalhesJogo(jogoId)
  return {
    valorNumerico: d.valorArrecadado,
    apoiadores: d.apoiadores,
    metaNumerico: d.metaValor
  }
}
