export default defineNuxtRouteMiddleware(() => {
  const auth = useCookie<{ user?: unknown } | null>('indiene_auth', { default: () => null })
  if (!auth.value?.user) {
    return navigateTo('/login')
  }
})
