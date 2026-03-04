<template>
  <section class="w-full overflow-hidden py-8">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-white">
          {{ title }}
        </h2>
        <NuxtLink
          v-if="verTudoHref"
          :to="verTudoHref"
          class="text-sm font-medium text-primary transition hover:text-primary/80"
        >
          Ver tudo
        </NuxtLink>
      </div>
      <div class="relative w-full overflow-hidden">
        <button
          type="button"
          class="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-800/90 text-white shadow-lg transition hover:bg-zinc-700"
          aria-label="Anterior"
          @click="scroll(-1)"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          type="button"
          class="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-800/90 text-white shadow-lg transition hover:bg-zinc-700"
          aria-label="Próximo"
          @click="scroll(1)"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
        <div
          ref="scrollRef"
          class="flex w-full gap-5 overflow-x-auto pb-4 scroll-smooth pl-1 pr-1"
          style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none;"
        >
          <NuxtLink
            v-for="(item, i) in items"
            :key="item.id ?? i"
            :to="item.id ? `/jogo/${item.id}` : '#'"
            class="relative block w-[220px] shrink-0 rounded-xl bg-zinc-900/80 transition hover:bg-zinc-800/80"
            style="scroll-snap-align: start;"
          >
            <div class="aspect-square w-full overflow-hidden rounded-t-xl bg-zinc-800">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                class="h-full w-full object-cover"
              >
              <div
                v-else
                class="flex h-full w-full items-center justify-center text-zinc-500 text-sm"
              >
                Jogo
              </div>
            </div>
            <div class="relative p-3">
              <button
                type="button"
                class="absolute right-3 top-2 rounded p-1 text-zinc-400 hover:text-white"
                aria-label="Salvar"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              </button>
              <h3 class="pr-8 text-sm font-semibold text-white line-clamp-1">
                {{ item.title }}
              </h3>
              <p v-if="item.subtitle" class="mt-0.5 text-xs text-zinc-400 line-clamp-1">
                {{ item.subtitle }}
              </p>
              <div class="mt-2 flex items-center justify-end">
                <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-zinc-900">
                  {{ item.rating ?? '—' }}%
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  verTudoHref?: string
  items: Array<{ id?: string; title: string; subtitle?: string; image?: string; rating?: string }>
}>()

const scrollRef = ref<HTMLElement | null>(null)

function scroll (direction: number) {
  const el = scrollRef.value
  if (!el) return
  const cardWidth = 220 + 20 // card width + gap
  el.scrollBy({ left: cardWidth * direction, behavior: 'smooth' })
}
</script>
