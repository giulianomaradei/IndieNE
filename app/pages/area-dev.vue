<template>
  <div class="min-h-screen bg-dark">
    <div class="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <!-- Coluna esquerda: perfil estúdio + meus jogos -->
        <aside class="w-full shrink-0 lg:w-80">
          <div class="flex flex-col gap-6">
            <!-- Card estúdio To the Sky -->
            <div class="rounded-xl border border-primary/50 bg-zinc-900/50 p-6">
              <div class="flex items-start gap-4">
                <div class="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-zinc-700" />
                <div class="min-w-0 flex-1">
                  <h2 class="text-2xl font-bold text-white">
                    To the Sky
                  </h2>
                  <p class="mt-1 text-sm text-muted">
                    Pequeno estúdio indie
                  </p>
                </div>
              </div>
              <p class="mt-4 text-sm font-medium uppercase tracking-wider text-white">
                Bio
              </p>
              <p class="mt-2 text-sm leading-relaxed text-white">
                Somos um estúdio de jogos indie focado em experiências únicas.
              </p>
              <div class="mt-4 h-px w-full bg-zinc-700" />
              <p class="mt-4 text-sm text-muted">
                Membro desde 2019
              </p>
              <p class="mt-1 text-sm text-white">
                R$ 97.869 arrecadados em 4 jogos
              </p>
              <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div class="h-full rounded-full bg-primary" :style="{ width: '60%' }" />
              </div>
            </div>

            <!-- Meus jogos -->
            <div class="rounded-xl border border-primary/50 bg-zinc-900/50 p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-white">
                  Meus jogos
                </h3>
                <button
                  type="button"
                  class="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-dark transition hover:bg-primary/90"
                  @click="abrirModalCriar()"
                >
                  Novo jogo
                </button>
              </div>
              <ul class="mt-4 flex flex-col gap-2">
                <li
                  v-for="item in meusJogos"
                  :key="item.id"
                >
                  <button
                    type="button"
                    class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition"
                    :class="jogoSelecionado === item.id ? 'bg-primary/20 text-white' : 'text-white hover:bg-zinc-800'"
                    @click="jogoSelecionado = item.id"
                  >
                    <div class="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-700">
                      <img
                        v-if="item.thumb"
                        :src="item.thumb"
                        :alt="item.title"
                        class="h-full w-full object-cover"
                      >
                    </div>
                    <span class="min-w-0 flex-1 truncate text-sm font-medium">
                      {{ item.title }}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <!-- Coluna direita: jogo selecionado (dashboard) + crowdfunding + posts -->
        <div class="min-w-0 flex-1">
          <template v-if="jogoAtual">
            <!-- Card do jogo selecionado -->
            <div class="rounded-xl border border-primary/50 bg-zinc-900/50 p-6">
              <div class="flex items-start justify-between gap-4">
                <h1 class="text-3xl font-bold text-white">
                  {{ jogoAtual.title }}
                </h1>
                <button
                  type="button"
                  class="shrink-0 rounded p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                  aria-label="Editar jogo"
                  @click="abrirModalEditar(jogoAtual)"
                >
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in jogoAtual.genero"
                  :key="tag"
                  class="rounded-full border border-primary/50 bg-transparent px-3 py-1 text-sm text-white"
                >
                  {{ tag }}
                </span>
              </div>
              <p class="mt-4 text-sm font-medium uppercase tracking-wider text-white">
                Bio
              </p>
              <p class="mt-2 text-sm leading-relaxed text-white">
                {{ jogoAtual.descricao || 'Sem descrição.' }}
              </p>
              <p class="mt-4 text-sm text-white">
                Fotos
              </p>
              <div class="mt-2 flex flex-wrap gap-2">
                <template v-if="jogoAtual.fotos?.length">
                  <div
                    v-for="(url, i) in jogoAtual.fotos"
                    :key="i"
                    class="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-700"
                  >
                    <img :src="url" :alt="`Foto ${i + 1}`" class="h-full w-full object-cover">
                  </div>
                </template>
                <div v-else class="h-16 w-20 shrink-0 rounded-lg bg-zinc-700" />
                <div class="flex h-16 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-zinc-600 text-sm text-muted">
                  + (editar para adicionar)
                </div>
              </div>

              <!-- Crowdfunding (resumo) -->
              <div class="mt-8 border-t border-zinc-700 pt-6">
                <p class="text-3xl font-bold text-white">
                  {{ jogoAtual.valorArrecadado || '—' }}
                </p>
                <p class="mt-2 text-sm text-white">
                  apoiado por {{ jogoAtual.apoiadores }} pessoas em {{ jogoAtual.dias }} dias
                </p>
                <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                  <div
                    class="h-full rounded-full bg-primary transition-all"
                    :style="{ width: Math.min(100, jogoAtual.metaPercentual || 0) + '%' }"
                  />
                </div>
                <p class="mt-2 text-sm font-medium text-white">
                  {{ jogoAtual.metaPercentual }}%
                </p>
                <p class="mt-1 text-sm text-white">
                  Meta {{ jogoAtual.metaValor || '—' }}
                </p>
                <p class="mt-1 text-sm text-white">
                  Campanha flexível*
                </p>
                <p class="mt-2 text-xs text-muted">
                  *Permite que usuários contribuam
                </p>
                <NuxtLink
                  to="#stripe"
                  class="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-dark transition hover:bg-primary/90"
                >
                  Acessar Stripe
                </NuxtLink>
              </div>
            </div>
          </template>
          <div v-else class="rounded-xl border border-primary/50 bg-zinc-900/50 p-8 text-center text-white">
            <p>Selecione um jogo na lista ou crie um novo.</p>
          </div>

          <!-- Modal criar/editar jogo -->
          <ModalJogoForm
            v-model="modalAberto"
            :jogo="jogoParaEditar"
            @save="onSalvarJogo"
          />

          <!-- Posts -->
          <div class="mt-10 border-t border-zinc-700 pt-8">
            <h2 class="text-lg font-bold text-white">
              Posts
            </h2>
            <div class="mt-6 flex flex-col gap-6">
              <article
                v-for="(post, idx) in posts"
                :key="idx"
                class="rounded-xl border border-primary/50 bg-zinc-900/50 p-6"
              >
                <h3 class="text-lg font-bold text-white">
                  {{ post.titulo }}
                </h3>
                <p class="mt-2 text-sm text-zinc-400">
                  {{ post.data }}
                </p>
                <div class="mt-4 overflow-hidden rounded-lg bg-zinc-800">
                  <div class="aspect-video w-full">
                    <div
                      class="flex h-full w-full items-center justify-center text-zinc-500 text-sm"
                    >
                      Imagem
                    </div>
                  </div>
                </div>
                <p class="mt-4 text-sm leading-relaxed text-white">
                  {{ post.descricao }}
                </p>
                <div class="mt-6 space-y-4 border-t border-zinc-700 pt-4">
                  <div
                    v-for="(comentario, cIdx) in post.comentarios"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JogoDev } from '~/types/jogo-dev'
import { useMeusJogos } from '~/composables/useMeusJogos'

definePageMeta({ layout: 'default', middleware: 'auth' })

const { meusJogos, addJogo, updateJogo, getJogoById } = useMeusJogos()

const jogoSelecionado = ref('')
const modalAberto = ref(false)
const jogoParaEditar = ref<JogoDev | null>(null)

// Selecionar primeiro jogo ao carregar
watch(meusJogos, (list) => {
  if (!jogoSelecionado.value && list.length > 0) {
    jogoSelecionado.value = list[0].id
  }
}, { immediate: true })

const jogoAtual = computed(() =>
  jogoSelecionado.value ? getJogoById(jogoSelecionado.value) : undefined
)

function abrirModalCriar () {
  jogoParaEditar.value = null
  modalAberto.value = true
}

function abrirModalEditar (jogo: JogoDev) {
  jogoParaEditar.value = jogo
  modalAberto.value = true
}

function onSalvarJogo (payload: JogoDev | (Omit<JogoDev, 'id'>)) {
  if ('id' in payload && payload.id) {
    updateJogo(payload.id, payload)
  } else {
    const novo = addJogo(payload)
    jogoSelecionado.value = novo.id
  }
}

const posts = [
  {
    titulo: 'Novos personagens: Halloween Set',
    data: '26/11 às 19h58',
    descricao: 'Adiciona seis novos desafios que desbloqueiam itens cosméticos inéditos, que, combinados, criam um divertido traje de apicultor, um traje de astronauta e um traje de hoquei.',
    comentarios: [
      { usuario: '@japa_UDI', texto: 'Godbreakers já mostra um potencial enorme. A gameplay é extremamente divertida e bem feita.', likes: 58, dislikes: 0 },
      { usuario: '@manoel_games', texto: 'Mesmo que fosse apenas falar do jogo eu iria ver haha desde o trailer eu tava empolgado', likes: 0, dislikes: 0 }
    ]
  },
  {
    titulo: 'Jardim Crepuscular',
    data: '2 meses atrás',
    descricao: 'Adiciona um novo cenário, o Jardim Crepuscular, repleto de flora bioluminescente e criaturas inéditas.',
    comentarios: [
      { usuario: '@tadala_queue', texto: 'Namoral muito hypado pô jogo assim que tiver na steam já vó deixar na minha wishlist', likes: 83, dislikes: 0 }
    ]
  },
  {
    titulo: 'Kael Ruvian - O Protagonista',
    data: '6 meses atrás',
    descricao: 'Um mensageiro errante marcado por energia arcana instável. Inclui cinco desafios que revelam fragmentos de sua história.',
    comentarios: [] as { usuario: string; texto: string; likes: number; dislikes: number }[]
  }
]
</script>
