<template>
  <div>
    <!-- Hero em destaque -->
    <CarouselHero :items="destaqueHero" />

    <!-- Destaques -->
    <CarouselDestaque
      title="Destaques"
      ver-tudo-href="/destaques"
      :items="jogosDestaque"
    />

    <!-- Por categoria: Sobrevivência, RPG -->
    <CarouselDestaque
      title="Sobrevivência"
      ver-tudo-href="/categoria/sobrevivencia"
      :items="jogosSobrevivencia"
    />
    <CarouselDestaque
      title="RPG"
      ver-tudo-href="/categoria/rpg"
      :items="jogosRpg"
    />

    <!-- Ver todas categorias -->
    <div class="flex justify-center py-4">
      <NuxtLink
        to="/categorias"
        class="text-sm font-medium text-primary transition hover:text-primary/80"
      >
        Ver todas categorias
      </NuxtLink>
    </div>

    <!-- Últimas postagens -->
    <section class="border-t border-zinc-800/80 py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-white">
            Últimas postagens
          </h2>
          <NuxtLink
            to="/postagens"
            class="text-sm font-medium text-primary transition hover:text-primary/80"
          >
            Ver tudo
          </NuxtLink>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(post, i) in ultimasPostagens"
            :key="post.id ?? i"
            class="rounded-xl bg-zinc-900/80 overflow-hidden transition hover:bg-zinc-800/80"
          >
            <div class="aspect-video w-full overflow-hidden bg-zinc-800">
              <img
                v-if="post.thumb"
                :src="post.thumb"
                :alt="post.titulo"
                class="h-full w-full object-cover"
              >
              <div v-else class="flex h-full w-full items-center justify-center text-zinc-500 text-sm">
                Post
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-white line-clamp-2">
                {{ post.titulo }}
              </h3>
              <p class="mt-1 text-sm text-zinc-400">
                {{ post.autor }}
              </p>
              <p v-if="post.descricao" class="mt-2 text-sm text-zinc-500 line-clamp-2">
                {{ post.descricao }}
              </p>
            </div>
          </article>
        </div>

        <!-- Paginação -->
        <div class="mt-10 flex items-center justify-center gap-1">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded text-zinc-400 hover:bg-zinc-800 hover:text-white"
            aria-label="Página anterior"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            v-for="p in paginationPages"
            :key="p"
            type="button"
            :class="[
              'flex h-9 min-w-[2.25rem] items-center justify-center rounded px-2 text-sm font-medium transition',
              p === paginaAtual
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            ]"
            @click="paginaAtual = p"
          >
            {{ p === -1 ? '…' : p }}
          </button>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded text-zinc-400 hover:bg-zinc-800 hover:text-white"
            aria-label="Próxima página"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const destaqueHero = [
  {
    id: '1',
    title: 'God Breakers',
    subtitle: 'Em destaque',
    tags: ['Roguelike', 'Ação', 'Multijogador', 'Cooperativo'],
    developer: 'To The Sky',
    rating: '87'
  },
  {
    id: '2',
    title: 'Jogo em destaque 2',
    subtitle: 'Explorando novos mundos.',
    tags: ['Indie', 'Aventura'],
    developer: 'Estúdio XYZ',
    rating: '92'
  },
  {
    id: '3',
    title: 'Jogo em destaque 3',
    subtitle: 'Em breve na comunidade.',
    tags: ['RPG', 'Estratégia'],
    developer: 'Dev Team',
    rating: '78'
  }
]

const jogosDestaque = [
  { id: '1', title: 'The Binding of Isaac: Rebirth', subtitle: 'Roguelike', rating: '73' },
  { id: '2', title: 'Absolum', subtitle: 'Pomadaria', rating: '91' },
  { id: '3', title: 'Back Seat Drivers', subtitle: 'Corrida', rating: '88' },
  { id: '4', title: 'Space Evolver', subtitle: 'Estratégia', rating: '63' },
  { id: '5', title: 'Hollow Knight', subtitle: 'Metroidvania', rating: '95' },
  { id: '6', title: 'Celeste', subtitle: 'Plataforma', rating: '92' },
  { id: '7', title: 'Dead Cells', subtitle: 'Roguelike', rating: '89' },
  { id: '8', title: 'Hades', subtitle: 'Roguelike', rating: '93' },
  { id: '9', title: 'Stardew Valley', subtitle: 'Simulação', rating: '97' },
  { id: '10', title: 'Undertale', subtitle: 'RPG', rating: '94' }
]

const jogosSobrevivencia = [
  { id: '1', title: 'DELIVERANCE', subtitle: 'Survival', rating: '85' },
  { id: '2', title: 'Flatlands', subtitle: 'Survival', rating: '72' },
  { id: '3', title: 'MONSTER SURVIVAL', subtitle: 'Survival', rating: '90' },
  { id: '4', title: 'THE GIANT OF GREEN PEAKS', subtitle: 'Survival', rating: '68' },
  { id: '5', title: 'The Forest', subtitle: 'Survival', rating: '86' },
  { id: '6', title: 'Valheim', subtitle: 'Survival', rating: '91' },
  { id: '7', title: 'Don\'t Starve', subtitle: 'Survival', rating: '88' },
  { id: '8', title: 'Subnautica', subtitle: 'Survival', rating: '89' },
  { id: '9', title: 'Raft', subtitle: 'Survival', rating: '79' },
  { id: '10', title: 'Grounded', subtitle: 'Survival', rating: '84' }
]

const jogosRpg = [
  { id: '1', title: 'SONGS OF SILENCE', subtitle: 'RPG', rating: '88' },
  { id: '2', title: 'AMERTA', subtitle: 'RPG', rating: '75' },
  { id: '3', title: 'COSMIC COOP', subtitle: 'RPG', rating: '82' },
  { id: '4', title: 'CASSETTE BEASTS', subtitle: 'RPG', rating: '91' },
  { id: '5', title: 'Chained Echoes', subtitle: 'RPG', rating: '90' },
  { id: '6', title: 'Sea of Stars', subtitle: 'RPG', rating: '87' },
  { id: '7', title: 'Eastward', subtitle: 'RPG', rating: '83' },
  { id: '8', title: 'CrossCode', subtitle: 'RPG', rating: '86' },
  { id: '9', title: 'Octopath Traveler', subtitle: 'RPG', rating: '84' },
  { id: '10', title: 'Triangle Strategy', subtitle: 'RPG', rating: '85' }
]

const ultimasPostagens = [
  { id: '1', titulo: 'Abrigo animal', autor: 'Bongo Cat', descricao: 'Novo update traz sistema de adoção e cuidados com os bichinhos.' },
  { id: '2', titulo: 'Novo mapa', autor: 'Park Run!', descricao: 'Conheça o mapa Floresta Negra com novos obstáculos e segredos.' },
  { id: '3', titulo: 'Design 2.0', autor: 'wrx Comunista Mario', descricao: 'Redesign completo da UI e novas animações.' },
  { id: '4', titulo: 'Novos veículos', autor: 'Racers', descricao: 'Três novos carros e modo multiplayer em tela dividida.' }
]

const paginaAtual = ref(1)
const totalPaginas = 24
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
</script>
