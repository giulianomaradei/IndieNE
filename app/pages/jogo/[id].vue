<template>
  <div class="min-h-screen bg-dark">
    <div class="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <!-- Coluna principal: hero + atualizações -->
        <div class="min-w-0 flex-1">
          <!-- Hero image -->
          <div class="overflow-hidden rounded-xl bg-zinc-800">
            <div class="aspect-video w-full bg-zinc-800">
              <img
                v-if="jogo.hero"
                :src="jogo.hero"
                :alt="jogo.titulo"
                class="h-full w-full object-cover"
              >
              <div
                v-else
                class="flex h-full w-full items-center justify-center text-zinc-500"
              >
                {{ jogo.titulo }}
              </div>
            </div>
          </div>

          <!-- ATUALIZAÇÕES -->
          <div class="mt-10 border-t border-zinc-700 pt-8">
            <h2 class="text-center text-sm font-medium uppercase tracking-widest text-white">
              Atualizações
            </h2>
            <div class="mt-6 flex flex-col gap-6">
              <article
                v-for="(atualizacao, idx) in jogo.atualizacoes"
                :key="idx"
                class="rounded-xl border border-primary/50 bg-zinc-900/50 p-6"
              >
                <h3 class="text-lg font-bold text-white">
                  {{ atualizacao.titulo }}
                </h3>
                <p class="mt-2 text-sm text-zinc-400">
                  {{ atualizacao.data }}
                </p>
                <div class="mt-4 overflow-hidden rounded-lg bg-zinc-800">
                  <div class="aspect-video w-full">
                    <img
                      v-if="atualizacao.imagem"
                      :src="atualizacao.imagem"
                      :alt="atualizacao.titulo"
                      class="h-full w-full object-cover"
                    >
                    <div
                      v-else
                      class="flex h-full w-full items-center justify-center text-zinc-500 text-sm"
                    >
                      Imagem
                    </div>
                  </div>
                </div>
                <p class="mt-4 text-sm leading-relaxed text-white">
                  {{ atualizacao.descricao }}
                </p>
                <!-- Comentários -->
                <div class="mt-6 space-y-4 border-t border-zinc-700 pt-4">
                  <div
                    v-for="(comentario, cIdx) in atualizacao.comentarios"
                    :key="cIdx"
                    class="flex gap-3"
                  >
                    <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-700" />
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-muted">
                        {{ comentario.usuario }}
                      </p>
                      <p class="mt-1 text-sm text-white">
                        {{ comentario.texto }}
                      </p>
                      <div class="mt-2 flex items-center gap-4 text-xs text-zinc-500">
                        <span>{{ comentario.likes }} likes</span>
                        <span>{{ comentario.dislikes }} dislikes</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-700" />
                    <input
                      type="text"
                      placeholder="Adicione um comentário..."
                      class="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-surface px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
                    >
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <!-- Sidebar: info do jogo -->
        <aside class="w-full shrink-0 lg:w-96">
          <div class="lg:sticky lg:top-24">
            <h1 class="text-3xl font-bold text-white">
              {{ jogo.titulo }}
            </h1>
            <!-- Tags -->
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in jogo.tags"
                :key="tag"
                class="rounded-full bg-zinc-800 px-3 py-1 text-sm text-white"
              >
                {{ tag }}
              </span>
              <button
                type="button"
                class="rounded-full bg-zinc-800 px-3 py-1 text-sm text-white transition hover:bg-zinc-700"
                aria-label="Mais tags"
              >
                +
              </button>
            </div>
            <p class="mt-6 text-sm leading-relaxed text-white">
              {{ jogo.descricao }}
            </p>
            <p v-if="jogo.desenvolvedor" class="mt-6 text-sm text-white">
              <span class="text-muted">Desenvolvedor:</span>
              <NuxtLink :to="`/desenvolvedores/${slugDev}`" class="text-primary hover:underline">
                {{ jogo.desenvolvedor }} (ver mais jogos)
              </NuxtLink>
            </p>

            <!-- Crowdfunding -->
            <div class="mt-8 rounded-xl border border-zinc-700 bg-zinc-900/50 p-6">
              <p class="text-3xl font-bold text-white">
                {{ jogo.valorArrecadado }}
              </p>
              <p class="mt-2 text-sm text-white">
                apoiado por {{ jogo.apoiadores }} pessoas em {{ jogo.dias }} dias
              </p>
              <div class="mt-3 h-2 overflow-hidden rounded-full bg-zinc-700">
                <div
                  class="h-full rounded-full bg-primary transition-all"
                  :style="{ width: jogo.metaPercentual + '%' }"
                />
              </div>
              <p class="mt-2 text-sm font-medium text-white">
                {{ jogo.metaPercentual }}%
              </p>
              <p class="mt-1 text-sm text-white">
                Meta {{ jogo.metaValor }}
              </p>
              <p class="mt-1 flex items-center gap-1 text-sm text-white">
                Campanha flexível
                <span class="text-muted" title="Info">?</span>
              </p>
              <NuxtLink
                to="/contribuir"
                class="mt-6 flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-bold uppercase tracking-wide text-dark transition hover:bg-primary/90"
              >
                Contribuir
              </NuxtLink>
            </div>

            <!-- FOTOS -->
            <div class="mt-10 border-t border-zinc-700 pt-8">
              <h2 class="text-center text-sm font-medium uppercase tracking-widest text-white">
                Fotos
              </h2>
              <div class="mt-6 grid grid-cols-3 gap-2">
                <div
                  v-for="(foto, fIdx) in jogo.fotos"
                  :key="fIdx"
                  class="aspect-square overflow-hidden rounded-lg bg-zinc-800"
                >
                  <img
                    v-if="foto"
                    :src="foto"
                    alt=""
                    class="h-full w-full object-cover"
                  >
                  <div
                    v-else
                    class="flex h-full w-full items-center justify-center text-zinc-500 text-xs"
                  >
                    {{ fIdx + 1 }}
                  </div>
                </div>
              </div>
              <NuxtLink
                to="#fotos"
                class="mt-4 block text-center text-sm font-medium uppercase tracking-widest text-primary hover:underline"
              >
                Ver mais
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { jogos } from '~/data/jogos'
import { slugify } from '~/utils/slug'

definePageMeta({ layout: 'default' })

const route = useRoute()
const id = computed(() => route.params.id as string)

const slugDev = computed(() => slugify(jogo.value.desenvolvedor))

const jogo = computed(() => {
  const item = jogos.find(j => j.id === id.value)
  if (!item) {
    return {
      titulo: 'Jogo não encontrado',
      descricao: '',
      tags: [] as string[],
      desenvolvedor: '',
      hero: '' as string,
      valorArrecadado: '—',
      apoiadores: 0,
      dias: 0,
      metaPercentual: 0,
      metaValor: '—',
      fotos: [] as string[],
      atualizacoes: [] as { titulo: string; data: string; descricao: string; imagem: string; comentarios: { usuario: string; texto: string; likes: number; dislikes: number }[] }[]
    }
  }
  const godBreakersMock = item.id === 'god-breakers' ? {
    descricao: 'Assuma o controle de cada luta em um combate fluido e feroz enquanto conecta combos agressivos, cancela ataques e coordena sua equipe para criar a equipe perfeita e derrube criaturas brutas em vários mundos.',
    valorArrecadado: 'R$ 68.745',
    apoiadores: 851,
    dias: 86,
    metaValor: 'R$ 100.000',
    fotos: ['', '', '', '', '', '', '', '', ''] as string[],
    atualizacoes: [
      { titulo: 'Novos personagens: Halloween Set', data: '26/11 às 19h58', descricao: 'Adiciona seis novos desafios que desbloqueiam itens cosméticos inéditos...', imagem: '', comentarios: [{ usuario: '@japa_UDI', texto: 'Godbreakers já mostra um potencial enorme.', likes: 58, dislikes: 0 }, { usuario: '@manoel_games', texto: 'Desde o trailer eu tava empolgado', likes: 0, dislikes: 0 }] },
      { titulo: 'Jardim Crepuscular', data: '2 meses atrás', descricao: 'Adiciona um novo cenário, o Jardim Crepuscular...', imagem: '', comentarios: [{ usuario: '@tadala_queue', texto: 'Muito hypado, já vó deixar na wishlist', likes: 83, dislikes: 0 }] },
      { titulo: 'Kael Ruvian - O Protagonista', data: '6 meses atrás', descricao: 'Um mensageiro errante marcado por energia arcana instável.', imagem: '', comentarios: [] as { usuario: string; texto: string; likes: number; dislikes: number }[] }
    ]
  } : {
    descricao: '',
    valorArrecadado: '—',
    apoiadores: 0,
    dias: 0,
    metaValor: '—',
    fotos: [] as string[],
    atualizacoes: [] as { titulo: string; data: string; descricao: string; imagem: string; comentarios: { usuario: string; texto: string; likes: number; dislikes: number }[] }[]
  }
  return {
    titulo: item.title,
    descricao: godBreakersMock.descricao,
    tags: item.genero,
    desenvolvedor: item.desenvolvedor,
    hero: item.thumb ?? '',
    valorArrecadado: godBreakersMock.valorArrecadado,
    apoiadores: godBreakersMock.apoiadores,
    dias: godBreakersMock.dias,
    metaPercentual: item.metaPercentual,
    metaValor: godBreakersMock.metaValor,
    fotos: godBreakersMock.fotos,
    atualizacoes: godBreakersMock.atualizacoes
  }
})
</script>
