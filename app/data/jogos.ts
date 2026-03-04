export interface Jogo {
  id: string
  title: string
  thumb?: string
  genero: string[]
  desenvolvedor: string
  rating: string
  metaPercentual: number
  dataPostagem: string
  dataConclusao?: string
  qtdeJogadores: string
  compatControle: boolean
  so: string[]
  categorias: string[]
}

export const jogos: Jogo[] = [
  { id: 'god-breakers', title: 'God Breakers', genero: ['Roguelike', 'Ação', 'Multijogador', 'Cooperativo'], desenvolvedor: 'To The Sky', rating: '87', metaPercentual: 68, dataPostagem: '2024-01-15', dataConclusao: '2025-06', qtdeJogadores: '1-4', compatControle: true, so: ['Windows', 'Linux'], categorias: ['destaque', 'destaque-hero'] },
  { id: 'binding-isaac', title: 'The Binding of Isaac: Rebirth', genero: ['Roguelike'], desenvolvedor: 'Nicalis', rating: '73', metaPercentual: 100, dataPostagem: '2014-11', dataConclusao: '2014-11', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['destaque', 'destaque-hero'] },
  { id: 'hades', title: 'Hades', genero: ['Roguelike', 'Ação'], desenvolvedor: 'Supergiant Games', rating: '93', metaPercentual: 100, dataPostagem: '2020-09', dataConclusao: '2020-09', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac'], categorias: ['destaque', 'destaque-hero'] },
  { id: 'absolum', title: 'Absolum', genero: ['RPG', 'Ação'], desenvolvedor: 'Pomadaria', rating: '91', metaPercentual: 45, dataPostagem: '2023-08', dataConclusao: '2024-12', qtdeJogadores: '1', compatControle: true, so: ['Windows'], categorias: ['destaque'] },
  { id: 'back-seat-drivers', title: 'Back Seat Drivers', genero: ['Corrida', 'Multijogador'], desenvolvedor: 'Racers Studio', rating: '88', metaPercentual: 82, dataPostagem: '2023-05', qtdeJogadores: '2-4', compatControle: true, so: ['Windows', 'Mac'], categorias: ['destaque'] },
  { id: 'space-evolver', title: 'Space Evolver', genero: ['Estratégia'], desenvolvedor: 'Cosmic Dev', rating: '63', metaPercentual: 25, dataPostagem: '2024-02', dataConclusao: '2025-03', qtdeJogadores: '1', compatControle: false, so: ['Windows'], categorias: ['destaque'] },
  { id: 'hollow-knight', title: 'Hollow Knight', genero: ['Metroidvania', 'Ação'], desenvolvedor: 'Team Cherry', rating: '95', metaPercentual: 100, dataPostagem: '2017-02', dataConclusao: '2017-02', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['destaque'] },
  { id: 'celeste', title: 'Celeste', genero: ['Plataforma'], desenvolvedor: 'Maddy Makes Games', rating: '92', metaPercentual: 100, dataPostagem: '2018-01', dataConclusao: '2018-01', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['destaque'] },
  { id: 'dead-cells', title: 'Dead Cells', genero: ['Roguelike', 'Ação'], desenvolvedor: 'Motion Twin', rating: '89', metaPercentual: 100, dataPostagem: '2018-08', dataConclusao: '2018-08', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['destaque'] },
  { id: 'stardew-valley', title: 'Stardew Valley', genero: ['Simulação', 'RPG'], desenvolvedor: 'ConcernedApe', rating: '97', metaPercentual: 100, dataPostagem: '2016-02', dataConclusao: '2016-02', qtdeJogadores: '1-4', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['destaque'] },
  { id: 'undertale', title: 'Undertale', genero: ['RPG'], desenvolvedor: 'Toby Fox', rating: '94', metaPercentual: 100, dataPostagem: '2015-09', dataConclusao: '2015-09', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['destaque'] },
  { id: 'deliverance', title: 'DELIVERANCE', genero: ['Survival', 'Ação'], desenvolvedor: 'Survival Studios', rating: '85', metaPercentual: 70, dataPostagem: '2023-10', dataConclusao: '2024-09', qtdeJogadores: '1-4', compatControle: true, so: ['Windows'], categorias: ['sobrevivencia', 'destaque'] },
  { id: 'flatlands', title: 'Flatlands', genero: ['Survival'], desenvolvedor: 'Flat Dev', rating: '72', metaPercentual: 55, dataPostagem: '2023-06', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Linux'], categorias: ['sobrevivencia'] },
  { id: 'monster-survival', title: 'MONSTER SURVIVAL', genero: ['Survival', 'Roguelike'], desenvolvedor: 'Monster Games', rating: '90', metaPercentual: 88, dataPostagem: '2024-01', qtdeJogadores: '1-2', compatControle: true, so: ['Windows'], categorias: ['sobrevivencia'] },
  { id: 'giant-green-peaks', title: 'THE GIANT OF GREEN PEAKS', genero: ['Survival'], desenvolvedor: 'Peak Studio', rating: '68', metaPercentual: 40, dataPostagem: '2023-12', qtdeJogadores: '1', compatControle: false, so: ['Windows'], categorias: ['sobrevivencia'] },
  { id: 'the-forest', title: 'The Forest', genero: ['Survival', 'Terror'], desenvolvedor: 'Endnight', rating: '86', metaPercentual: 100, dataPostagem: '2018-04', dataConclusao: '2018-04', qtdeJogadores: '1-8', compatControle: true, so: ['Windows'], categorias: ['sobrevivencia'] },
  { id: 'valheim', title: 'Valheim', genero: ['Survival', 'Exploração'], desenvolvedor: 'Iron Gate', rating: '91', metaPercentual: 100, dataPostagem: '2021-02', qtdeJogadores: '1-10', compatControle: false, so: ['Windows', 'Linux'], categorias: ['sobrevivencia'] },
  { id: 'dont-starve', title: "Don't Starve", genero: ['Survival'], desenvolvedor: 'Klei', rating: '88', metaPercentual: 100, dataPostagem: '2013-04', dataConclusao: '2013-04', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['sobrevivencia'] },
  { id: 'subnautica', title: 'Subnautica', genero: ['Survival', 'Exploração'], desenvolvedor: 'Unknown Worlds', rating: '89', metaPercentual: 100, dataPostagem: '2018-01', dataConclusao: '2018-01', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac'], categorias: ['sobrevivencia'] },
  { id: 'raft', title: 'Raft', genero: ['Survival'], desenvolvedor: 'Redbeet', rating: '79', metaPercentual: 100, dataPostagem: '2022-06', dataConclusao: '2022-06', qtdeJogadores: '1-8', compatControle: false, so: ['Windows'], categorias: ['sobrevivencia'] },
  { id: 'grounded', title: 'Grounded', genero: ['Survival'], desenvolvedor: 'Obsidian', rating: '84', metaPercentual: 100, dataPostagem: '2022-09', qtdeJogadores: '1-4', compatControle: true, so: ['Windows'], categorias: ['sobrevivencia'] },
  { id: 'songs-of-silence', title: 'SONGS OF SILENCE', genero: ['RPG', 'Estratégia'], desenvolvedor: 'Chimera Games', rating: '88', metaPercentual: 60, dataPostagem: '2024-03', dataConclusao: '2025-06', qtdeJogadores: '1', compatControle: true, so: ['Windows'], categorias: ['rpg'] },
  { id: 'amerta', title: 'AMERTA', genero: ['RPG'], desenvolvedor: 'Indie RPG Studio', rating: '75', metaPercentual: 35, dataPostagem: '2023-11', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac'], categorias: ['rpg'] },
  { id: 'cosmic-coop', title: 'COSMIC COOP', genero: ['RPG', 'Cooperativo'], desenvolvedor: 'Cosmic Dev', rating: '82', metaPercentual: 50, dataPostagem: '2024-01', qtdeJogadores: '2-4', compatControle: true, so: ['Windows'], categorias: ['rpg'] },
  { id: 'cassette-beasts', title: 'CASSETTE BEASTS', genero: ['RPG'], desenvolvedor: 'Bytten Studio', rating: '91', metaPercentual: 100, dataPostagem: '2023-04', dataConclusao: '2023-04', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['rpg'] },
  { id: 'chained-echoes', title: 'Chained Echoes', genero: ['RPG'], desenvolvedor: 'Matthias Linda', rating: '90', metaPercentual: 100, dataPostagem: '2022-12', dataConclusao: '2022-12', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['rpg'] },
  { id: 'sea-of-stars', title: 'Sea of Stars', genero: ['RPG'], desenvolvedor: 'Sabotage', rating: '87', metaPercentual: 100, dataPostagem: '2023-08', dataConclusao: '2023-08', qtdeJogadores: '1-2', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['rpg'] },
  { id: 'eastward', title: 'Eastward', genero: ['RPG', 'Aventura'], desenvolvedor: 'Pixpil', rating: '83', metaPercentual: 100, dataPostagem: '2021-09', dataConclusao: '2021-09', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac'], categorias: ['rpg'] },
  { id: 'crosscode', title: 'CrossCode', genero: ['RPG', 'Ação'], desenvolvedor: 'Radical Fish', rating: '86', metaPercentual: 100, dataPostagem: '2018-09', dataConclusao: '2018-09', qtdeJogadores: '1', compatControle: true, so: ['Windows', 'Mac', 'Linux'], categorias: ['rpg'] },
  { id: 'octopath', title: 'Octopath Traveler', genero: ['RPG'], desenvolvedor: 'Square Enix', rating: '84', metaPercentual: 100, dataPostagem: '2018-07', dataConclusao: '2018-07', qtdeJogadores: '1', compatControle: true, so: ['Windows'], categorias: ['rpg'] },
  { id: 'triangle-strategy', title: 'Triangle Strategy', genero: ['RPG', 'Estratégia'], desenvolvedor: 'Square Enix', rating: '85', metaPercentual: 100, dataPostagem: '2022-03', dataConclusao: '2022-03', qtdeJogadores: '1', compatControle: true, so: ['Windows'], categorias: ['rpg'] },
  { id: 'ambrosia', title: 'AMBROSIA', genero: ['RPG', 'Aventura'], desenvolvedor: 'Indie Studio', rating: '78', metaPercentual: 42, dataPostagem: '2024-05', qtdeJogadores: '1', compatControle: true, so: ['Windows'], categorias: ['rpg'] },
]
