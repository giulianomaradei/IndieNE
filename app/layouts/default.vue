<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">
    <header class="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight">
          <span class="text-white">indie</span><span class="text-primary">NE</span>
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex">
          <NuxtLink
            to="/explorar"
            class="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Explorar
          </NuxtLink>
          <NuxtLink
            to="/como-funciona"
            class="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Como Funciona
          </NuxtLink>
          <NuxtLink
            to="/meus-jogos"
            class="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Meus Jogos
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <NuxtLink
            to="/area-dev"
            class="rounded-lg border border-primary bg-black px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Área DEV
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-primary/90"
          >
            Login/Cadastro
          </NuxtLink>
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>
