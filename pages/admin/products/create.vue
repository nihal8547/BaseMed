<template>
  <div>
    <div class="admin-page-header">
      <div class="breadcrumb">
        <NuxtLink to="/admin/products" class="text-muted">Products</NuxtLink>
        <span class="mx-2 text-muted">/</span>
        <span>Create</span>
      </div>
      <h1 class="admin-title mt-2">Add New Product</h1>
    </div>

    <div class="admin-form-card">
      <form @submit.prevent="handleSubmit">
        
        <div class="form-grid">
          <div class="form-group">
            <label>Product Name</label>
            <input v-model="form.name" type="text" required class="form-input" placeholder="e.g. Surgical Masks" />
          </div>

          <div class="form-group">
            <label>Category</label>
            <select v-model="form.category" required class="form-input">
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Product Image</label>
          <div class="image-upload-wrap">
            <div v-if="form.image" class="image-preview">
              <img :src="form.image" alt="Preview" />
              <button type="button" class="btn-icon bg-white text-danger remove-img" @click="form.image = ''">
                <component :is="icons.X" :size="16" />
              </button>
            </div>
            <div v-else class="upload-placeholder">
              <input type="file" accept="image/*" @change="handleImageUpload" class="file-input" :disabled="isUploadingImage" />
              <div class="upload-content">
                <span v-if="isUploadingImage">Uploading...</span>
                <span v-else>Click or drag to upload image</span>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Short Description (Catalog View)</label>
          <input v-model="form.shortDescription" type="text" required class="form-input" />
        </div>

        <div class="form-group">
          <label>Full Description</label>
          <textarea v-model="form.description" rows="4" required class="form-input"></textarea>
        </div>

        <div class="form-divider"></div>

        <div class="form-group">
          <label class="flex justify-between items-center mb-2">
            <span>Key Features</span>
            <button type="button" class="btn btn-outline btn-sm" @click="addFeature">Add Feature</button>
          </label>
          <div v-for="(feat, index) in form.features" :key="index" class="dynamic-row">
            <input v-model="form.features[index]" type="text" class="form-input" placeholder="Feature..." />
            <button type="button" class="btn-icon text-danger" @click="removeFeature(index)">
              <component :is="icons.X" :size="16" />
            </button>
          </div>
        </div>

        <div class="form-divider"></div>

        <div class="form-group">
          <label class="flex justify-between items-center mb-2">
            <span>Specifications</span>
            <button type="button" class="btn btn-outline btn-sm" @click="addSpec">Add Specification</button>
          </label>
          <div v-for="(spec, index) in specsList" :key="index" class="dynamic-row">
            <input v-model="spec.key" type="text" class="form-input" placeholder="Key (e.g. Material)" />
            <input v-model="spec.value" type="text" class="form-input" placeholder="Value (e.g. Nitrile)" />
            <button type="button" class="btn-icon text-danger" @click="removeSpec(index)">
              <component :is="icons.X" :size="16" />
            </button>
          </div>
        </div>

        <div class="form-actions">
          <NuxtLink to="/admin/products" class="btn btn-outline">Cancel</NuxtLink>
          <button type="submit" class="btn btn-primary" :disabled="isSaving || isUploadingImage">
            {{ isSaving ? 'Saving...' : 'Save Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from '@lucide/vue'

definePageMeta({ layout: 'admin', middleware: ['auth'] })
useHead({ title: 'Create Product' })

const icons = { X }
const { addProduct, fetchProducts } = useProducts()
const { categories, fetchCategories, isCategoriesFetched } = useCategories()
const router = useRouter()

const isSaving = ref(false)
const isUploadingImage = ref(false)

const form = ref({
  name: '',
  category: '',
  image: '',
  shortDescription: '',
  description: '',
  features: ['']
})

const specsList = ref([{ key: '', value: '' }])

onMounted(async () => {
  if (!isCategoriesFetched.value) {
    await fetchCategories()
  }
  if (categories.value.length > 0 && !form.value.category) {
    form.value.category = categories.value[0].name
  }
})

const addFeature = () => form.value.features.push('')
const removeFeature = (index: number) => form.value.features.splice(index, 1)

const addSpec = () => specsList.value.push({ key: '', value: '' })
const removeSpec = (index: number) => specsList.value.splice(index, 1)

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  const formData = new FormData()
  formData.append('file', file)

  isUploadingImage.value = true
  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (response.url) {
      form.value.image = response.url
    }
  } catch (error) {
    alert('Failed to upload image')
  } finally {
    isUploadingImage.value = false
    target.value = '' // reset input
  }
}

const handleSubmit = async () => {
  isSaving.value = true
  
  // Transform specsList array to object
  const specifications: Record<string, string> = {}
  specsList.value.forEach(s => {
    if (s.key && s.value) specifications[s.key] = s.value
  })

  // Filter empty features
  const features = form.value.features.filter(f => f.trim() !== '')

  const payload = {
    ...form.value,
    features,
    specifications
  }

  try {
    await addProduct(payload)
    router.push('/admin/products')
  } catch (error) {
    alert('Error saving product.')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.admin-page-header { margin-bottom: 2rem; }
.admin-title { font-size: 1.75rem; color: var(--color-secondary); }
.breadcrumb { font-size: 0.875rem; font-weight: 500; }
.text-muted { color: var(--color-text-muted); text-decoration: none; }
.mx-2 { margin: 0 0.5rem; }
.mt-2 { margin-top: 0.5rem; }

.admin-form-card {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  max-width: 800px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.9375rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.form-divider {
  height: 1px;
  background-color: var(--color-border);
  margin: 2rem 0;
}

.dynamic-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
}

.flex { display: flex; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
.mb-2 { margin-bottom: 0.5rem; }

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
}

.text-danger { color: #dc2626; }
.text-danger:hover { background-color: #fee2e2; }

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.image-upload-wrap {
  border: 2px dashed var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  transition: border-color 0.2s;
  background-color: #f8fafc;
}

.image-upload-wrap:hover {
  border-color: var(--color-primary);
}

.image-preview {
  position: relative;
  display: inline-block;
  max-width: 200px;
}

.image-preview img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  display: block;
}

.remove-img {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bg-white { background-color: white; }

.upload-placeholder {
  position: relative;
  padding: 2rem 1rem;
  cursor: pointer;
}

.file-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-content {
  color: var(--color-text-muted);
  font-weight: 500;
  font-size: 0.875rem;
}
</style>
