<template>
  <div class="min-h-screen bg-dark">
    <div class="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-8 lg:px-12">
      <!-- Barra de busca -->
      <div class="mb-8 flex justify-center">
        <div class="w-full max-w-search">
          <input
            v-model="busca"
            type="search"
            placeholder="o que você procura hoje?"
            class="h-14 w-full rounded-lg border-0 bg-surface px-6 py-3 text-base text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/50"
            aria-label="Buscar"
          />
        </div>
      </div>

      <div class="flex flex-col gap-8 lg:flex-row">
        <!-- Sidebar FILTROS -->
        <aside class="w-full shrink-0 lg:w-72">
          <div class="flex items-center gap-2 border-b border-zinc-700 pb-4">
            <span class="text-base font-medium tracking-wide text-white">
              FILTROS
            </span>
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <nav class="mt-4 flex flex-col">
            <template v-for="(filtro, index) in filtros" :key="filtro.id">
              <div v-if="index > 0" class="h-px w-full bg-zinc-700" />
              <button
                type="button"
                class="flex w-full items-center justify-between py-3 text-left text-base text-white transition hover:opacity-90"
                @click="toggleFiltro(filtro.id)"
              >
                <span>{{ filtro.label }}</span>
                <span class="text-lg leading-none text-white">+</span>
              </button>
            </template>
          </nav>
        </aside>

        <!-- Grid de jogos -->
        <div class="min-w-0 flex-1">
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <NuxtLink
              v-for="(jogo, i) in jogosExibidos"
              :key="jogo.id ?? i"
              :to="`/jogo/${jogo.id ?? i}`"
              class="group block overflow-hidden rounded-xl transition hover:opacity-95"
            >
              <div class="aspect-video w-full overflow-hidden bg-zinc-800">
                <img
                  v-if="jogo.thumb"
                  :src="jogo.thumb"
                  :alt="jogo.title"
                  class="h-full w-full object-cover transition group-hover:scale-105"
                >
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500"
                >
                  <span class="text-sm">{{ jogo.title }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Paginação -->
          <div class="mt-10 flex items-center justify-center gap-1">
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              aria-label="Página anterior"
              @click="paginaAtual = Math.max(1, paginaAtual - 1)"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <template v-for="p in paginationPages" :key="p">
              <button
                v-if="p !== -1"
                type="button"
                :class="[
                  'flex h-9 min-w-9 items-center justify-center rounded px-2 text-sm font-normal transition',
                  p === paginaAtual
                    ? 'text-primary'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                ]"
                @click="paginaAtual = p"
              >
                {{ p }}
              </button>
              <span v-else class="flex h-9 items-center px-1 text-sm text-zinc-400">. . .</span>
            </template>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              aria-label="Próxima página"
              @click="paginaAtual = Math.min(totalPaginas, paginaAtual + 1)"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const busca = ref('')

const filtros = [
  { id: 'genero', label: 'Gênero' },
  { id: 'meta', label: '% Meta alcançada' },
  { id: 'postagem', label: 'Data de postagem' },
  { id: 'conclusao', label: 'Data de conclusão' },
  { id: 'desenvolvedor', label: 'Desenvolvedor' },
  { id: 'jogadores', label: 'Qtde. jogadores' },
  { id: 'controle', label: 'Compat. c/ controle' },
  { id: 'so', label: 'SO' }
]

function toggleFiltro (_id: string) {
  // TODO: expandir/colapsar painel do filtro
}

const jogosGrid = [
  { id: '1', title: 'DELIVERANCE', thumb: '' },
  { id: '2', title: 'Flatlands', thumb: '' },
  { id: '3', title: 'MONSTER SURVIVAL', thumb: '' },
  { id: '4', title: 'THE GIANT OF GREEN PEAKS', thumb: '' },
  { id: '5', title: 'SONGS OF SILENCE', thumb: '' },
  { id: '6', title: 'AMBROSIA', thumb: '' },
  { id: '7', title: 'COSMIC COOP', thumb: '' },
  { id: '8', title: 'CASSETTE BEASTS', thumb: '' },
  { id: '9', title: 'Chained Echoes', thumb: '' },
  { id: '10', title: 'Sea of Stars', thumb: '' },
  { id: '11', title: 'Eastward', thumb: '' },
  { id: '12', title: 'The Binding of Isaac', thumb: '' },
  { id: '13', title: 'Absolum', thumb: '' },
  { id: '14', title: 'Back Seat Drivers', thumb: '' },
  { id: '15', title: 'Space Evolver', thumb: '' },
  { id: '16', title: 'Hollow Knight', thumb: '' },
  { id: '17', title: 'Celeste', thumb: '' },
  { id: '18', title: 'Dead Cells', thumb: '' },
  { id: '19', title: 'Hades', thumb: '' },
  { id: '20', title: 'Stardew Valley', thumb: '' },
  { id: '21', title: 'Undertale', thumb: '' },
  { id: '22', title: 'CrossCode', thumb: '' },
  { id: '23', title: 'Octopath Traveler', thumb: '' },
  { id: '24', title: 'Valheim', thumb: '' }
]

const paginaAtual = ref(1)
const totalPaginas = 24
const itensPorPagina = 12

const paginationPages = computed(() => {
  const p = paginaAtual.value
  const pages: number[] = []
  if (totalPaginas <= 9) {
    for (let i = 1; i <= totalPaginas; i++) pages.push(i)
  } else {
    pages.push(1)
    if (p > 3) pages.push(-1)
    for (let i = Math.max(2, p - 1); i <= Math.min(totalPaginas - 1, p + 1); i++) {
      if (!pages.includes(i)) pages.push(i)
    }
    if (p < totalPaginas - 2) pages.push(-1)
    if (totalPaginas > 1) pages.push(totalPaginas)
  }
  return pages
})

// Para o layout do Figma (24 páginas), repetimos os itens para preencher as páginas
const todosJogos = computed(() => {
  const total = totalPaginas * itensPorPagina
  const list: { id: string; title: string; thumb: string }[] = []
  for (let i = 0; i < total; i++) {
    const src = jogosGrid[i % jogosGrid.length]!
    list.push({ id: String(i + 1), title: src.title, thumb: src.thumb ?? '' })
  }
  return list
})

const jogosExibidos = computed(() => {
  const start = (paginaAtual.value - 1) * itensPorPagina
  return todosJogos.value.slice(start, start + itensPorPagina)
})
</script>
