<template>
  <div class="min-h-screen bg-dark">
    <div class="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-8 lg:px-12">
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
        <aside class="w-full shrink-0 lg:w-72">
          <div class="flex items-center gap-2 border-b border-zinc-700 pb-4">
            <span class="text-base font-medium tracking-wide text-white">
              FILTROS
            </span>
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <nav class="mt-4 flex flex-col gap-0">
            <template v-for="(filtro, index) in filtrosConfig" :key="filtro.id">
              <div v-if="index > 0" class="h-px w-full bg-zinc-700" />
              <div class="py-3">
                <button
                  type="button"
                  class="flex w-full items-center justify-between text-left text-base text-white transition hover:opacity-90"
                  @click="toggleFiltro(filtro.id)"
                >
                  <span>{{ filtro.label }}</span>
                  <span class="text-lg leading-none transition" :class="filtroAberto === filtro.id ? 'rotate-45' : ''">+</span>
                </button>
                <div v-show="filtroAberto === filtro.id" class="mt-3 space-y-2 pl-1">
                  <template v-if="filtro.id === 'genero'">
                    <label v-for="g in opcoesFiltros.generos" :key="g" class="flex cursor-pointer items-center gap-2 text-sm text-white">
                      <input v-model="filtros.generos" type="checkbox" :value="g" class="rounded border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>{{ g }}</span>
                    </label>
                  </template>
                  <template v-else-if="filtro.id === 'meta'">
                    <label class="flex cursor-pointer items-center gap-2 text-sm text-muted">
                      <input v-model="filtros.metaMin" type="radio" :value="null" name="meta" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>Qualquer</span>
                    </label>
                    <label v-for="m in opcoesFiltros.metas.filter(x => x > 0)" :key="m" class="flex cursor-pointer items-center gap-2 text-sm text-white">
                      <input v-model="filtros.metaMin" type="radio" :value="m" name="meta" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>≥ {{ m }}%</span>
                    </label>
                  </template>
                  <template v-else-if="filtro.id === 'desenvolvedor'">
                    <label class="flex cursor-pointer items-center gap-2 text-sm text-muted">
                      <input v-model="filtros.desenvolvedor" type="radio" :value="null" name="dev" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>Qualquer</span>
                    </label>
                    <label v-for="d in opcoesFiltros.desenvolvedores" :key="d" class="flex cursor-pointer items-center gap-2 text-sm text-white">
                      <input v-model="filtros.desenvolvedor" type="radio" :value="d" name="dev" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span class="truncate">{{ d }}</span>
                    </label>
                  </template>
                  <template v-else-if="filtro.id === 'postagem'">
                    <label class="flex cursor-pointer items-center gap-2 text-sm text-muted">
                      <input v-model="filtros.dataPostagem" type="radio" :value="null" name="postagem" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>Qualquer</span>
                    </label>
                    <label v-for="ano in opcoesFiltros.anosPostagem" :key="ano" class="flex cursor-pointer items-center gap-2 text-sm text-white">
                      <input v-model="filtros.dataPostagem" type="radio" :value="ano" name="postagem" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>{{ ano }}</span>
                    </label>
                  </template>
                  <template v-else-if="filtro.id === 'jogadores'">
                    <label class="flex cursor-pointer items-center gap-2 text-sm text-muted">
                      <input v-model="filtros.qtdeJogadores" type="radio" :value="null" name="jogadores" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>Qualquer</span>
                    </label>
                    <label v-for="q in opcoesFiltros.jogadores" :key="q" class="flex cursor-pointer items-center gap-2 text-sm text-white">
                      <input v-model="filtros.qtdeJogadores" type="radio" :value="q" name="jogadores" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>{{ q }}</span>
                    </label>
                  </template>
                  <template v-else-if="filtro.id === 'controle'">
                    <label class="flex cursor-pointer items-center gap-2 text-sm text-muted">
                      <input v-model="filtros.compatControle" type="radio" :value="null" name="controle" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>Qualquer</span>
                    </label>
                    <label class="flex cursor-pointer items-center gap-2 text-sm text-white">
                      <input v-model="filtros.compatControle" type="radio" :value="true" name="controle" class="border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>Sim</span>
                    </label>
                  </template>
                  <template v-else-if="filtro.id === 'so'">
                    <label v-for="s in opcoesFiltros.sistemas" :key="s" class="flex cursor-pointer items-center gap-2 text-sm text-white">
                      <input v-model="filtros.so" type="checkbox" :value="s" class="rounded border-zinc-600 bg-surface text-primary focus:ring-primary">
                      <span>{{ s }}</span>
                    </label>
                  </template>
                </div>
              </div>
            </template>
          </nav>
        </aside>

        <div class="min-w-0 flex-1">
          <p class="mb-4 text-sm text-muted">
            {{ jogosFiltrados.length }} jogo(s) encontrado(s)
          </p>
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <NuxtLink
              v-for="(jogo, i) in jogosExibidos"
              :key="jogo.id"
              :to="`/jogo/${jogo.id}`"
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

          <div v-if="totalPaginas > 0" class="mt-10 flex items-center justify-center gap-1">
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              aria-label="Página anterior"
              :disabled="paginaAtual === 1"
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
              :disabled="paginaAtual === totalPaginas"
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

const route = useRoute()
const router = useRouter()
const itensPorPagina = 12

const busca = ref('')
const filtroAberto = ref<string | null>('genero')

const filtros = reactive({
  generos: [] as string[],
  desenvolvedor: null as string | null,
  metaMin: null as number | null,
  dataPostagem: null as string | null,
  qtdeJogadores: null as string | null,
  compatControle: null as boolean | null,
  so: [] as string[]
})

/** Lê os query params e aplica nos filtros (ex.: /explorar?genero=Survival&genero=RPG) */
function syncQueryToFiltros () {
  const q = route.query
  const genero = q.genero
  filtros.generos = (Array.isArray(genero) ? genero : genero ? [genero] : []).filter((v): v is string => typeof v === 'string')
  if (q.busca !== undefined) busca.value = (q.busca as string) ?? ''
  filtros.desenvolvedor = (q.desenvolvedor as string) || null
  filtros.metaMin = q.metaMin != null ? Number(q.metaMin) : null
  filtros.dataPostagem = (q.dataPostagem as string) || null
  filtros.qtdeJogadores = (q.qtdeJogadores as string) || null
  filtros.compatControle = q.controle === 'sim' ? true : null
  const so = q.so
  filtros.so = (Array.isArray(so) ? so : so ? [so] : []).filter((v): v is string => typeof v === 'string')
  if (filtros.generos.length) filtroAberto.value = 'genero'
}

/** Atualiza a URL com os filtros atuais (mantém link compartilhável) */
function syncFiltrosToQuery () {
  const query: Record<string, string | string[] | number | undefined> = {}
  if (filtros.generos.length) query.genero = filtros.generos.length === 1 ? filtros.generos[0]! : [...filtros.generos]
  if (busca.value.trim()) query.busca = busca.value.trim()
  if (filtros.desenvolvedor) query.desenvolvedor = filtros.desenvolvedor
  if (filtros.metaMin != null) query.metaMin = filtros.metaMin
  if (filtros.dataPostagem) query.dataPostagem = filtros.dataPostagem
  if (filtros.qtdeJogadores) query.qtdeJogadores = filtros.qtdeJogadores
  if (filtros.compatControle === true) query.controle = 'sim'
  if (filtros.so.length) query.so = filtros.so.length === 1 ? filtros.so[0]! : [...filtros.so]
  router.replace({ path: route.path, query })
}

watch(() => route.fullPath, syncQueryToFiltros, { immediate: true })
watch(filtros, syncFiltrosToQuery, { deep: true })
watch(busca, syncFiltrosToQuery)

const filtrosConfig = [
  { id: 'genero', label: 'Gênero' },
  { id: 'meta', label: '% Meta alcançada' },
  { id: 'postagem', label: 'Data de postagem' },
  { id: 'desenvolvedor', label: 'Desenvolvedor' },
  { id: 'jogadores', label: 'Qtde. jogadores' },
  { id: 'controle', label: 'Compat. c/ controle' },
  { id: 'so', label: 'SO' }
]

function toggleFiltro (id: string) {
  filtroAberto.value = filtroAberto.value === id ? null : id
}

const { jogosFiltrados, opcoesFiltros } = useJogosFiltrados({
  busca,
  generos: toRef(filtros, 'generos'),
  desenvolvedor: toRef(filtros, 'desenvolvedor'),
  metaMin: toRef(filtros, 'metaMin'),
  dataPostagem: toRef(filtros, 'dataPostagem'),
  qtdeJogadores: toRef(filtros, 'qtdeJogadores'),
  compatControle: toRef(filtros, 'compatControle'),
  so: toRef(filtros, 'so')
})

const paginaAtual = ref(1)
const totalPaginas = computed(() => Math.ceil(jogosFiltrados.value.length / itensPorPagina) || 0)

watch(jogosFiltrados, () => { paginaAtual.value = 1 }, { deep: true })

const paginationPages = computed(() => {
  const p = paginaAtual.value
  const total = totalPaginas.value
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

const jogosExibidos = computed(() => {
  const start = (paginaAtual.value - 1) * itensPorPagina
  return jogosFiltrados.value.slice(start, start + itensPorPagina)
})
</script>
