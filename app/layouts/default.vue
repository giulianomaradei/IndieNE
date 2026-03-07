<template>
  <div class="min-h-screen bg-dark text-zinc-100">
    <header class="sticky top-0 z-50 border-b border-zinc-800 bg-dark/95 backdrop-blur-sm">
      <div class="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight">
          <span class="text-white">indie</span><span class="text-primary">NE</span>
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex">
          <NuxtLink
            to="/"
            class="text-sm font-normal transition hover:opacity-90"
            :class="$route.path === '/' ? 'text-primary' : 'text-muted'"
          >
            Início
          </NuxtLink>
          <NuxtLink
            to="/explorar"
            class="text-sm font-normal transition hover:opacity-90"
            :class="$route.path === '/explorar' ? 'text-primary' : 'text-muted'"
          >
            Explorar
          </NuxtLink>
          <NuxtLink
            to="/como-funciona"
            class="text-sm font-normal transition hover:opacity-90"
            :class="$route.path === '/como-funciona' ? 'text-primary' : 'text-muted'"
          >
            Como Funciona
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <template v-if="isLoggedIn">
            <NuxtLink
              to="/area-dev"
              class="rounded-lg px-5 py-2.5 text-sm font-normal transition"
              :class="$route.path === '/area-dev' ? 'bg-primary text-dark hover:bg-primary/90' : 'border border-primary bg-transparent text-primary hover:bg-primary/10'"
            >
              Área DEV
            </NuxtLink>
            <NuxtLink
              to="/perfil"
              class="rounded-lg border border-primary bg-transparent px-5 py-2.5 text-sm font-normal text-primary transition hover:bg-primary/10"
            >
              Meu perfil
            </NuxtLink>
          </template>
          <template v-else>
            <span
              class="cursor-not-allowed rounded-lg border border-zinc-600 bg-zinc-800/50 px-5 py-2.5 text-sm font-normal text-zinc-500"
              title="Faça login para acessar a Área DEV"
            >
              Área DEV
            </span>
            <NuxtLink
              to="/login"
              class="rounded-lg bg-primary px-5 py-2.5 text-sm font-normal text-dark transition hover:bg-primary/90"
            >
              Login / Cadastro
            </NuxtLink>
          </template>
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn } = useAuth()
</script>
