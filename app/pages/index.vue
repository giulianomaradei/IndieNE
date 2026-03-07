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

    <!-- Últimas postagens -->
    <section class="border-t border-zinc-800/80 py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-white">
            Últimas postagens
          </h2>

        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="(post, i) in ultimasPostagensPagina"
            :key="post.id"
            :to="`/jogo/${post.jogoId}`"
            class="block rounded-xl bg-zinc-900/80 overflow-hidden transition hover:bg-zinc-800/80"
          >
            <article class="h-full">
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
          </NuxtLink>
        </div>

        <!-- Paginação -->
        <div
          v-if="totalPaginas > 1"
          class="mt-10 flex items-center justify-center gap-1"
        >
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Página anterior"
            :disabled="paginaAtual <= 1"
            @click="paginaAtual = Math.max(1, paginaAtual - 1)"
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
import { getDetalhesJogo } from '~/data/jogo-detalhes'
import { jogos } from '~/data/jogos'

definePageMeta({ layout: 'default' })

const { destaqueHero, jogosDestaque, jogosSobrevivencia, jogosRpg } = useJogos()

const ultimasPostagens = computed(() => {
  const list: { id: string; titulo: string; autor: string; descricao: string; thumb?: string; jogoId: string }[] = []
  for (const jogo of jogos) {
    const detalhes = getDetalhesJogo(jogo.id)
    detalhes.atualizacoes.forEach((post, idx) => {
      list.push({
        id: `${jogo.id}-${idx}`,
        titulo: post.titulo,
        autor: jogo.title,
        descricao: post.descricao,
        thumb: post.imagem,
        jogoId: jogo.id
      })
    })
  }
  return list
})

const ITENS_POR_PAGINA = 8
const paginaAtual = ref(1)
const totalPaginas = computed(() =>
  Math.max(1, Math.ceil(ultimasPostagens.value.length / ITENS_POR_PAGINA))
)
const ultimasPostagensPagina = computed(() => {
  const start = (paginaAtual.value - 1) * ITENS_POR_PAGINA
  return ultimasPostagens.value.slice(start, start + ITENS_POR_PAGINA)
})
const paginationPages = computed(() => {
  const total = totalPaginas.value
  const p = paginaAtual.value
  const pages: number[] = []
  if (total <= 9) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (p > 3) pages.push(-1)
    for (let i = Math.max(2, p - 1); i <= Math.min(total - 1, p + 1); i++) {
      if (!pages.includes(i)) pages.push(i)
    }
    if (p < total - 2) pages.push(-1)
    if (total > 1) pages.push(total)
  }
  return pages
})
</script>
