<template>
  <div>
    <!-- Hero em destaque -->
    <CarouselHero :items="destaqueHero" />

    <!-- Destaques -->
    <CarouselDestaque
      title="Destaques"
      :items="jogosDestaque"
    />

    <!-- Por categoria: Sobrevivência, RPG -->
    <CarouselDestaque
      title="Sobrevivência"
      ver-tudo-href="/explorar?genero=Survival"
      :items="jogosSobrevivencia"
    />
    <CarouselDestaque
      title="RPG"
      ver-tudo-href="/explorar?genero=RPG"
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
              'flex h-9 min-w-9 items-center justify-center rounded px-2 text-sm font-medium transition',
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

const { destaqueHero, jogosDestaque, jogosSobrevivencia, jogosRpg } = useJogos()

const ultimasPostagens = [
  { id: '1', titulo: 'Abrigo animal', autor: 'Bongo Cat', descricao: 'Novo update traz sistema de adoção e cuidados com os bichinhos.', thumb: undefined as string | undefined },
  { id: '2', titulo: 'Novo mapa', autor: 'Park Run!', descricao: 'Conheça o mapa Floresta Negra com novos obstáculos e segredos.', thumb: undefined as string | undefined },
  { id: '3', titulo: 'Design 2.0', autor: 'wrx Comunista Mario', descricao: 'Redesign completo da UI e novas animações.', thumb: undefined as string | undefined },
  { id: '4', titulo: 'Novos veículos', autor: 'Racers', descricao: 'Três novos carros e modo multiplayer em tela dividida.', thumb: undefined as string | undefined }
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
