export const useAuth = () => {
  const user = useState<{ username: string; role: string } | null>('auth_user', () => null)
  const isAuthInitialized = useState('auth_initialized', () => false)

  const fetchUser = async () => {
    try {
      const data = await $fetch<any>('/api/auth/me', {
        headers: useRequestHeaders(['cookie']) as Record<string, string>
      })
      if (data && data.user) {
        user.value = data.user
      } else {
        user.value = null
      }
    } catch {
      user.value = null
    } finally {
      isAuthInitialized.value = true
    }
  }

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const data = await $fetch<any>('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      if (data && data.user) {
        user.value = data.user
      }
    } catch (error: any) {
      throw new Error(error.data?.statusMessage || 'Login failed')
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
  }

  return {
    user,
    isAuthInitialized,
    fetchUser,
    login,
    logout
  }
}
