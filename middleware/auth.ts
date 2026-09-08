export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, fetchUser, isAuthInitialized } = useAuth()

  // Only run fetchUser on client side if not initialized, or during SSR once
  if (!isAuthInitialized.value) {
    await fetchUser()
  }

  if (!user.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  if (user.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
