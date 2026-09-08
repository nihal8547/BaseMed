<template>
  <div>
    <div class="admin-page-header">
      <h1 class="admin-title">Dashboard</h1>
      <p class="text-muted">Welcome back to the BaseMed Admin Panel.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrap bg-primary-light">
          <component :is="icons.Package" :size="24" class="text-primary" />
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ products.length }}</div>
          <div class="stat-label">Total Products</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon-wrap bg-secondary-light">
          <component :is="icons.LayoutGrid" :size="24" class="text-secondary" />
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ categories.length }}</div>
          <div class="stat-label">Categories</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon-wrap bg-success-light">
          <component :is="icons.Eye" :size="24" class="text-success" />
        </div>
        <div class="stat-info">
          <div class="stat-value">1.2k</div>
          <div class="stat-label">Catalog Views (Mock)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package, LayoutGrid, Eye } from '@lucide/vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
useHead({ title: 'Dashboard' })

const icons = { Package, LayoutGrid, Eye }
const { products, getCategories } = useProducts()
const categories = computed(() => getCategories())
</script>

<style scoped>
.admin-page-header {
  margin-bottom: 2rem;
}

.admin-title {
  font-size: 1.75rem;
  color: var(--color-secondary);
  margin-bottom: 0.25rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: var(--shadow-sm);
}

.stat-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-primary-light { background-color: #e0f2fe; }
.text-primary { color: #0284c7; }

.bg-secondary-light { background-color: #f1f5f9; }
.text-secondary { color: #475569; }

.bg-success-light { background-color: #dcfce3; }
.text-success { color: #16a34a; }

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-secondary);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
