<template>
  <NuxtLayout name="default">
    <div class="error-page section text-center container">
      <div v-if="error?.statusCode === 404">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-desc mt-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      </div>
      <div v-else>
        <h1 class="error-code">{{ error?.statusCode || '500' }}</h1>
        <h2 class="error-title">An Error Occurred</h2>
        <p class="error-desc mt-4">{{ error?.message || 'Something went wrong.' }}</p>
      </div>
      
      <div class="mt-8">
        <button class="btn btn-primary" @click="handleError">Go to Homepage</button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })

useHead({
  title: `${props.error?.statusCode === 404 ? '404 Not Found' : 'Error'} | BaseMed`
})
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
.error-code {
  font-size: 8rem;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.1;
  margin-bottom: -3rem;
  position: relative;
  z-index: 0;
}
.error-title {
  font-size: 2.5rem;
  position: relative;
  z-index: 1;
}
.error-desc {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  color: var(--color-text-muted);
  font-size: 1.125rem;
}
</style>
