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
  valorArrecadado: string
  apoiadores: number
  dias: number
  metaValor: string
  fotos: string[]
  atualizacoes: Atualizacao[]
}

const vazio: DetalhesJogo = {
  descricao: '',
  valorArrecadado: '—',
  apoiadores: 0,
  dias: 0,
  metaValor: '—',
  fotos: [],
  atualizacoes: []
}

const detalhesPorJogo: Record<string, DetalhesJogo> = {
  'god-breakers': {
    descricao: 'Assuma o controle de cada luta em um combate fluido e feroz enquanto conecta combos agressivos, cancela ataques e coordena sua equipe para criar a equipe perfeita e derrube criaturas brutas em vários mundos.',
    valorArrecadado: 'R$ 68.745',
    apoiadores: 851,
    dias: 86,
    metaValor: 'R$ 100.000',
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
