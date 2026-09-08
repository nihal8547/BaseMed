<template>
  <div class="login-layout">
    <div class="login-card">
      <div class="login-header">
        <div class="brand-icon">B</div>
        <h2>BaseMed Admin</h2>
        <p class="text-muted">Sign in to manage your site</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="errorMessage" class="error-alert">
          {{ errorMessage }}
        </div>

        <div class="form-group">
          <label>Username</label>
          <div class="input-wrap">
            <component :is="icons.User" :size="18" class="input-icon" />
            <input v-model="form.username" type="text" required placeholder="Enter admin username" />
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="input-wrap">
            <component :is="icons.Lock" :size="18" class="input-icon" />
            <input v-model="form.password" type="password" required placeholder="Enter password" />
          </div>
        </div>

        <button type="submit" class="btn-primary w-full mt-4" :disabled="isLoading">
          {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>
      
      <div class="login-footer">
        <NuxtLink to="/">← Return to public site</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@lucide/vue'

definePageMeta({
  layout: false // Don't use the admin layout which has the sidebar
})
useHead({ title: 'Admin Login | BaseMed' })

const icons = { User, Lock }
const { login } = useAuth()
const router = useRouter()

const isLoading = ref(false)
const errorMessage = ref('')
const form = ref({ username: '', password: '' })

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    await login({ username: form.value.username, password: form.value.password })
    router.push('/admin')
  } catch (err: any) {
    errorMessage.value = err.message || 'Invalid username or password'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
  padding: 1rem;
}

.login-card {
  background: white;
  width: 100%;
  max-width: 400px;
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-icon {
  width: 48px;
  height: 48px;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
}

.login-header h2 {
  font-size: 1.5rem;
  color: var(--color-secondary);
  margin-bottom: 0.25rem;
}

.text-muted { color: var(--color-text-muted); font-size: 0.875rem; }

.error-alert {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

.input-wrap {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
}

.input-wrap input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.9375rem;
  transition: all 0.2s;
}

.input-wrap input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover:not(:disabled) { background-color: var(--color-primary-dark); }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
.w-full { width: 100%; }
.mt-4 { margin-top: 1rem; }

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.login-footer a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
}

.login-footer a:hover { color: var(--color-primary); }
</style>
