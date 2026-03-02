<template>
  <div class="min-h-screen bg-dark text-zinc-100">
    <header class="sticky top-0 z-50 border-b border-zinc-800 bg-dark/95 backdrop-blur-sm">
      <div class="mx-auto flex h-20 max-w-content items-center justify-between px-6 sm:px-8 lg:px-12">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight">
          <span class="text-white">indie</span><span class="text-primary">NE</span>
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex">
          <NuxtLink
            to="/explorar"
            class="text-sm font-normal transition hover:opacity-90"
            :class="$route.path === '/explorar' ? 'text-primary' : 'text-muted'"
          >
            Explorar
          </NuxtLink>
          <NuxtLink
            to="/desenvolvedores"
            class="text-sm font-normal text-muted transition hover:opacity-90"
          >
            Desenvolvedores
          </NuxtLink>
          <NuxtLink
            to="/forum"
            class="text-sm font-normal text-muted transition hover:opacity-90"
          >
            Fórum
          </NuxtLink>
          <NuxtLink
            to="/crowdfunding"
            class="text-sm font-normal text-muted transition hover:opacity-90"
          >
            Crowdfunding
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/area-dev"
            class="rounded-lg border border-primary bg-transparent px-5 py-2.5 text-sm font-normal text-primary transition hover:bg-primary/10"
          >
            Área DEV
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="rounded-lg bg-primary px-5 py-2.5 text-sm font-normal text-dark transition hover:bg-primary/90"
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
