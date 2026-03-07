<template>
  <div />
</template>

<script setup lang="ts">
// Rotas /images/* não são páginas; redireciona para home.
// Evita o aviso do Vue Router quando algo navega para um path de imagem.
await navigateTo('/', { replace: true })
</script>
