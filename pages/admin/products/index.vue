<template>
  <div>
    <div class="admin-page-header flex justify-between items-end">
      <div>
        <h1 class="admin-title">Products</h1>
        <p class="text-muted">Manage your product catalog.</p>
      </div>
      <NuxtLink to="/admin/products/create" class="btn btn-primary">
        <component :is="icons.Plus" :size="16" />
        Add Product
      </NuxtLink>
    </div>

    <div class="table-card">
      <div v-if="isLoading" class="p-8 text-center text-muted">
        Loading products...
      </div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <div class="product-cell">
                <img :src="product.image" alt="" class="product-thumb" />
                <div class="product-info">
                  <div class="product-name">{{ product.name }}</div>
                  <div class="product-id">ID: {{ product.id }}</div>
                </div>
              </div>
            </td>
            <td>
              <span class="badge">{{ product.category }}</span>
            </td>
            <td>
              <div class="action-cell">
                <NuxtLink :to="`/admin/products/${product.id}`" class="btn-icon btn-edit" title="Edit">
                  <component :is="icons.Edit2" :size="16" />
                </NuxtLink>
                <button class="btn-icon btn-delete" title="Delete" @click="promptDelete(product.id)">
                  <component :is="icons.Trash" :size="16" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="3" class="text-center p-8 text-muted">No products found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">Delete Product</h3>
        <p class="modal-text">Are you sure you want to delete this product? This action cannot be undone.</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="cancelDelete" :disabled="isDeleting">Cancel</button>
          <button class="btn-danger flex items-center gap-2" @click="confirmDelete" :disabled="isDeleting">
            <component :is="icons.Trash" :size="16" />
            <span>{{ isDeleting ? 'Deleting...' : 'Yes, Delete' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit2, Trash } from '@lucide/vue'
import { ref } from 'vue'

definePageMeta({ layout: 'admin', middleware: ['auth'] })
useHead({ title: 'Manage Products' })

const icons = { Plus, Edit2, Trash }
const { products, isLoading, deleteProduct, fetchProducts, isProductsFetched } = useProducts()

const isDeleteModalOpen = ref(false)
const productToDelete = ref<string | null>(null)
const isDeleting = ref(false)

onMounted(async () => {
  if (!isProductsFetched.value) {
    await fetchProducts()
  }
})

const promptDelete = (id: string) => {
  productToDelete.value = id
  isDeleteModalOpen.value = true
}

const cancelDelete = () => {
  if (isDeleting.value) return
  productToDelete.value = null
  isDeleteModalOpen.value = false
}

const confirmDelete = async () => {
  if (productToDelete.value) {
    try {
      isDeleting.value = true
      await deleteProduct(productToDelete.value)
      cancelDelete()
    } catch (error) {
      console.error(error)
      alert('Failed to delete product. Please try again.')
    } finally {
      isDeleting.value = false
    }
  }
}
</script>

<style scoped>
.admin-page-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.admin-title {
  font-size: 1.75rem;
  color: var(--color-secondary);
  margin-bottom: 0.25rem;
}

.table-card {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.admin-table th {
  background-color: #f8fafc;
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--color-border);
}

.admin-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}

.admin-table tbody tr:last-child td {
  border-bottom: none;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-thumb {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid var(--color-border);
}

.product-name {
  font-weight: 600;
  color: var(--color-secondary);
  margin-bottom: 0.25rem;
}

.product-id {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.badge {
  display: inline-flex;
  padding: 0.25rem 0.75rem;
  background-color: #f1f5f9;
  color: var(--color-text);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.action-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit { color: #0284c7; }
.btn-edit:hover { background-color: #e0f2fe; }

.btn-delete { color: #dc2626; }
.btn-delete:hover { background-color: #fee2e2; }

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.modal-text {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.btn-secondary {
  background-color: #f1f5f9;
  color: #334155;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
}

.btn-danger:hover {
  background-color: #b91c1c;
}

.flex { display: flex; }
.items-center { align-items: center; }
.gap-2 { gap: 0.5rem; }

.p-8 { padding: 2rem; }
.text-center { text-align: center; }
</style>
