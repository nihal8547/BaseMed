<template>
  <div>
    <div class="admin-page-header flex justify-between items-end">
      <div>
        <h1 class="admin-title">Categories</h1>
        <p class="text-muted">Manage product categories.</p>
      </div>
      <button @click="openCreateModal" class="btn btn-primary">
        <component :is="icons.Plus" :size="16" />
        Add Category
      </button>
    </div>

    <div class="table-card">
      <div v-if="isLoading" class="p-8 text-center text-muted">
        Loading categories...
      </div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td class="font-medium text-secondary">{{ category.name }}</td>
            <td class="text-muted">{{ category.slug }}</td>
            <td>
              <div class="action-cell">
                <button class="btn-icon btn-edit" title="Edit" @click="openEditModal(category)">
                  <component :is="icons.Edit2" :size="16" />
                </button>
                <button class="btn-icon btn-delete" title="Delete" @click="handleDelete(category.id)">
                  <component :is="icons.Trash2" :size="16" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="3" class="text-center p-8 text-muted">No categories found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal (Very basic custom modal implementation) -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content admin-form-card">
        <h2 class="section-heading">{{ editingCategory ? 'Edit Category' : 'New Category' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Category Name</label>
            <input v-model="form.name" type="text" required class="form-input" placeholder="e.g. Surgical Masks" />
          </div>
          <div class="form-actions mt-6">
            <button type="button" class="btn btn-outline" @click="isModalOpen = false">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save Category' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit2, Trash2 } from '@lucide/vue'

definePageMeta({ layout: 'admin', middleware: ['auth'] })
useHead({ title: 'Manage Categories' })

const icons = { Plus, Edit2, Trash2 }
const { categories, isLoading, fetchCategories, addCategory, updateCategory, deleteCategory, isCategoriesFetched } = useCategories()

const isModalOpen = ref(false)
const isSaving = ref(false)
const editingCategory = ref<any>(null)

const form = ref({
  name: ''
})

onMounted(async () => {
  if (!isCategoriesFetched.value) {
    await fetchCategories()
  }
})

const openCreateModal = () => {
  editingCategory.value = null
  form.value.name = ''
  isModalOpen.value = true
}

const openEditModal = (category: any) => {
  editingCategory.value = category
  form.value.name = category.name
  isModalOpen.value = true
}

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this category?')) {
    await deleteCategory(id)
  }
}

const handleSubmit = async () => {
  isSaving.value = true
  try {
    if (editingCategory.value) {
      await updateCategory(editingCategory.value.id, { name: form.value.name })
    } else {
      await addCategory({ name: form.value.name })
    }
    isModalOpen.value = false
  } catch (err) {
    // Error handled in composable mostly
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.admin-page-header { margin-bottom: 2rem; }
.admin-title { font-size: 1.75rem; color: var(--color-secondary); margin-bottom: 0.25rem; }
.table-card { background-color: white; border: 1px solid var(--color-border); border-radius: 1rem; overflow: hidden; box-shadow: var(--shadow-sm); }
.admin-table { width: 100%; border-collapse: collapse; text-align: left; }
.admin-table th { background-color: #f8fafc; padding: 1rem 1.5rem; font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; border-bottom: 1px solid var(--color-border); }
.admin-table td { padding: 1rem 1.5rem; border-bottom: 1px solid var(--color-border); vertical-align: middle; }
.font-medium { font-weight: 500; }
.text-secondary { color: var(--color-secondary); }
.text-muted { color: var(--color-text-muted); }
.action-cell { display: flex; align-items: center; gap: 0.5rem; }
.btn-icon { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; }
.btn-edit { color: #0284c7; } .btn-edit:hover { background-color: #e0f2fe; }
.btn-delete { color: #dc2626; } .btn-delete:hover { background-color: #fee2e2; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.section-heading { font-size: 1.25rem; font-weight: 700; color: var(--color-secondary); margin-bottom: 1.5rem; }
.form-group label { display: block; font-weight: 600; font-size: 0.875rem; color: var(--color-secondary); margin-bottom: 0.5rem; }
.form-input { width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border); border-radius: 0.5rem; font-family: inherit; font-size: 0.9375rem; }
.form-input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1); }
.form-actions { display: flex; justify-content: flex-end; gap: 1rem; }
.mt-6 { margin-top: 1.5rem; }
</style>
